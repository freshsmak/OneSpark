import { motion } from "framer-motion";
import { SparkResult } from "@/lib/spark-engine";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface ProductCardProps {
  result: SparkResult;
}

export function ProductCard({ result }: ProductCardProps) {
  const { concept, category, painPoints } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="w-full max-w-md mx-auto perspective-1000"
    >
      {/* The Card Container */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
        
        <Card className="relative overflow-hidden bg-[#1a1a3e] border-white/10 text-white shadow-2xl rounded-xl h-[600px] flex flex-col">
          
          {/* Header / Gradient Top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0f0f23] to-[#1a1a3e] z-0" />
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs font-medium tracking-widest text-white/50 uppercase flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                One Spark • {category}
              </div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-display font-bold text-white tracking-tight mb-1"
            >
              {concept.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-primary font-medium font-display"
            >
              {concept.tagline}
            </motion.p>
          </CardHeader>

          <CardContent className="relative z-10 flex-1 flex flex-col gap-6 pt-4 overflow-y-auto scrollbar-hide">
            
            {/* Problem Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 rounded-lg p-4 border border-white/5"
            >
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                The Problem
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                "{concept.pain_solved}"
              </p>
            </motion.div>

            {/* Solution Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" />
                The Solution
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {concept.description}
              </p>
              
              <div className="space-y-2">
                {concept.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (i * 0.1) }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <ArrowRight className="w-3 h-3 text-white/30" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <Separator className="bg-white/10" />

            {/* Footer Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-auto grid grid-cols-2 gap-4"
            >
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Price Point</div>
                <div className="text-lg font-bold text-yellow-400 font-mono">{concept.price_point}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Vibe</div>
                <div className="text-xs text-gray-300 italic leading-tight">{concept.vibe}</div>
              </div>
            </motion.div>

          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
