import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, History, Lock } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import generatedImage from '@assets/generated_images/abstract_dark_neural_network_background_with_sparks.png';

export default function Landing() {
  return (
    <div className="min-h-screen w-full text-foreground relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${generatedImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background z-0 pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            AI-POWERED IDEATION ENGINE
          </Badge>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
            ONE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SPARK</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Turn real consumer pain points into million-dollar product concepts.
            <span className="block mt-2 text-base">Powered by AI. Built for entrepreneurs.</span>
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 w-full max-w-3xl"
        >
          <div className="glass-panel p-6 rounded-xl">
            <Zap className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-display font-bold mb-2">Instant Generation</h3>
            <p className="text-sm text-muted-foreground">
              Generate unique product concepts in seconds
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <Sparkles className="w-8 h-8 text-secondary mb-3 mx-auto" />
            <h3 className="font-display font-bold mb-2">Real Pain Points</h3>
            <p className="text-sm text-muted-foreground">
              Based on authentic consumer complaints
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl relative">
            <History className="w-8 h-8 text-accent mb-3 mx-auto" />
            <h3 className="font-display font-bold mb-2 flex items-center justify-center gap-2">
              Saved History
              <Lock className="w-3 h-3 text-yellow-500" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Access your sparks anytime, anywhere
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] group"
            >
              <Sparkles className="mr-2 w-6 h-6 fill-black group-hover:text-primary transition-colors" />
              Start Creating
            </Button>
          </SignInButton>

          <p className="text-sm text-white/40 font-mono">
            Free forever • Unlimited sparks • Sign in to get started
          </p>
        </motion.div>

      </main>
    </div>
  );
}
