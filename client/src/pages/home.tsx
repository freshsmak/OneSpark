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
import { Sparkles, RefreshCw, Zap, LogOut, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "@clerk/clerk-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Spark } from "@shared/schema";
import generatedImage from '@assets/generated_images/abstract_dark_neural_network_background_with_sparks.png';

// Convert database Spark to SparkResult format
function sparkToResult(spark: Spark): SparkResult {
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
  };
}

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SparkResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [useAI, setUseAI] = useState(true);

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sparks"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        return;
      }
      console.error("Failed to save spark:", error);
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
      }, 2000);
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

  const handleHistorySelect = (spark: SparkResult) => {
    setResult(spark);
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
      <SignOutButton>
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </SignOutButton>

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
            Turn real pain points into million-dollar concepts instantly.
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
                className="flex gap-4"
              >
                <Button
                  variant="outline"
                  onClick={handleGenerate}
                  className="border-white/20 hover:bg-white/10 text-white gap-2"
                  data-testid="button-generate-another"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another
                </Button>
              </motion.div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
