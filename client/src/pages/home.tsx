import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { generateSpark, SparkResult } from "@/lib/spark-engine";
import { ProductCard } from "@/components/spark-card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import generatedImage from '@assets/generated_images/abstract_dark_neural_network_background_with_sparks.png';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SparkResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const LOADING_STEPS = [
    "Scanning consumer trends...",
    "Searching Reddit for pain points...",
    "Analyzing Amazon reviews...",
    "Identifying market gaps...",
    "Consulting Claude AI...",
    "Refining product concept...",
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
    setResult(null);
    setLoadingStep(0);

    try {
      const data = await generateSpark();
      setResult(data);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0099', '#00ffff', '#ffffff']
      });
      
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
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

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
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
              <Button 
                size="lg" 
                onClick={handleGenerate}
                className="h-20 px-12 text-xl rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] group"
              >
                <Zap className="mr-2 w-6 h-6 fill-black group-hover:text-primary transition-colors" />
                Ignite Spark
              </Button>
              <p className="mt-6 text-sm text-white/40 font-mono">
                Press to generate a novel product concept
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
              <ProductCard result={result} />
              
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
