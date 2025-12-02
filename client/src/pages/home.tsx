import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generateSpark, generateSparkWithAI, SparkResult } from "@/lib/spark-engine";
import { ProductCard } from "@/components/spark-card";
import { HistoryDrawer } from "@/components/history-drawer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, RefreshCw, Zap, LogOut, Bot, Share2, Check, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Spark } from "@shared/schema";
import generatedImage from '@assets/generated_images/abstract_dark_neural_network_background_with_sparks.png';

// Extended SparkResult that includes database ID for sharing
interface SparkResultWithId extends SparkResult {
  sparkId?: number;
}

// Convert database Spark to SparkResult format
function sparkToResult(spark: Spark): SparkResultWithId {
  return {
    category: spark.category,
    painPoints: [], // Not stored in DB
    concept: {
      name: spark.conceptName,
      tagline: spark.conceptTagline,
      pain_solved: spark.painSolved,
      description: spark.description,
      features: spark.features as string[],
      price_point: spark.pricePoint,
      vibe: spark.vibe,
      image: spark.image || undefined,
    },
    sparkId: spark.id,
  };
}

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SparkResult | null>(null);
  const [currentSparkId, setCurrentSparkId] = useState<number | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [useAI, setUseAI] = useState(true);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Load user's saved sparks
  const { data: savedSparks = [] } = useQuery<Spark[]>({
    queryKey: ["/api/sparks"],
    enabled: !!user,
  });

  const history = savedSparks.map(sparkToResult);

  // Mutation to save a spark
  const saveSpark = useMutation({
    mutationFn: async (spark: SparkResult) => {
      const res = await fetch("/api/sparks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: spark.category,
          conceptName: spark.concept.name,
          conceptTagline: spark.concept.tagline,
          painSolved: spark.concept.pain_solved,
          description: spark.concept.description,
          features: spark.concept.features,
          pricePoint: spark.concept.price_point,
          vibe: spark.concept.vibe,
          image: spark.concept.image,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save spark");
      }
      return res.json();
    },
    onSuccess: (savedSpark: Spark) => {
      queryClient.invalidateQueries({ queryKey: ["/api/sparks"] });
      setCurrentSparkId(savedSpark.id);
      setShareLink(null);
      setLinkCopied(false);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to save spark",
        variant: "destructive",
      });
    },
  });
  
  const LOADING_STEPS = useAI ? [
    "Scanning consumer trends...",
    "Analyzing pain points...",
    "Consulting Claude AI...",
    "Crafting product concept...",
    "Generating product image...",
    "Rendering final design...",
  ] : [
    "Scanning consumer trends...",
    "Searching Reddit for pain points...",
    "Analyzing Amazon reviews...",
    "Identifying market gaps...",
    "Remixing concepts...",
    "Designing product card..."
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % LOADING_STEPS.length);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLoadingStep(0);

    try {
      const data = useAI ? await generateSparkWithAI() : await generateSpark();
      setResult(data);
      
      // Save to database
      saveSpark.mutate(data);
      
      // Trigger confetti with extra pizzazz for AI-generated
      confetti({
        particleCount: useAI ? 150 : 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: useAI ? ['#ff0099', '#00ffff', '#ffff00', '#ffffff'] : ['#ff0099', '#00ffff', '#ffffff']
      });
      
    } catch (error) {
      console.error("Generation failed", error);
      toast({
        title: "Error",
        description: "Failed to generate spark",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHistorySelect = (spark: SparkResultWithId) => {
    setResult(spark);
    // Use the spark ID directly from the extended result
    setCurrentSparkId(spark.sparkId || null);
    setShareLink(null);
    setLinkCopied(false);
  };

  const handleShare = async () => {
    if (!currentSparkId) return;
    
    setIsSharing(true);
    try {
      const res = await fetch(`/api/sparks/${currentSparkId}/share`, {
        method: "POST",
      });
      
      if (!res.ok) {
        throw new Error("Failed to create share link");
      }
      
      const { shareId } = await res.json();
      const link = `${window.location.origin}/shared/${shareId}`;
      setShareLink(link);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      
      toast({
        title: "Link copied!",
        description: "Share this secret link with one person",
      });
      
      // Reset copied state after 3 seconds
      setTimeout(() => setLinkCopied(false), 3000);
      
    } catch (error) {
      console.error("Share failed:", error);
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-foreground relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${generatedImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background z-0 pointer-events-none" />

      {/* History Drawer (Fixed UI Element) */}
      <HistoryDrawer history={history} onSelect={handleHistorySelect} />

      {/* Logout Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.location.href = '/api/logout'}
        className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center pt-12 md:pt-0">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            AI-POWERED IDEATION
          </Badge>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight">
            ONE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">SPARK</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Fully automated consumer product ideation. 
            Turn real pain points into billion-dollar concepts instantly.
          </p>
        </motion.div>

        {/* Action Area */}
        <div className="w-full flex flex-col items-center gap-8 min-h-[600px]">
          
          {!result && !isGenerating && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center flex-1"
            >
              {/* AI Mode Toggle */}
              <div className="flex items-center gap-3 mb-8 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className={`text-sm font-medium transition-colors ${!useAI ? 'text-white' : 'text-white/40'}`}>
                  Fast
                </span>
                <Switch
                  checked={useAI}
                  onCheckedChange={setUseAI}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                  data-testid="toggle-ai-mode"
                />
                <span className={`text-sm font-medium flex items-center gap-1 transition-colors ${useAI ? 'text-white' : 'text-white/40'}`}>
                  <Bot className="w-4 h-4" />
                  Claude AI
                </span>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleGenerate}
                className="h-20 px-12 text-xl rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] group"
                data-testid="button-generate"
              >
                <Zap className="mr-2 w-6 h-6 fill-black group-hover:text-primary transition-colors" />
                Ignite Spark
              </Button>
              <p className="mt-6 text-sm text-white/40 font-mono">
                {useAI ? 'Claude AI will generate a novel concept in real-time' : 'Quick generation from pre-built concept library'}
              </p>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center flex-1 gap-6"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadingStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-lg font-mono text-primary"
                  >
                    {LOADING_STEPS[loadingStep]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {result && !isGenerating && (
            <div className="w-full flex flex-col items-center gap-8">
              {/* Key is used to force re-mount animation when result changes */}
              <ProductCard key={result.concept.name} result={result} />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleGenerate}
                    className="border-white/20 hover:bg-white/10 text-white gap-2"
                    data-testid="button-generate-another"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generate Another
                  </Button>
                  
                  {currentSparkId && (
                    <Button 
                      variant="outline"
                      onClick={handleShare}
                      disabled={isSharing}
                      className="border-primary/50 hover:bg-primary/10 text-primary gap-2"
                      data-testid="button-share"
                    >
                      {isSharing ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : linkCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                      {linkCopied ? "Copied!" : "Share"}
                    </Button>
                  )}
                </div>
                
                {shareLink && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10"
                  >
                    <input 
                      type="text" 
                      readOnly 
                      value={shareLink}
                      className="bg-transparent text-white/70 text-xs font-mono w-64 outline-none"
                      data-testid="input-share-link"
                    />
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={async () => {
                        await navigator.clipboard.writeText(shareLink);
                        setLinkCopied(true);
                        setTimeout(() => setLinkCopied(false), 3000);
                        toast({ title: "Copied!", description: "Link copied to clipboard" });
                      }}
                      className="h-6 px-2 text-white/70 hover:text-white"
                      data-testid="button-copy-link"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
