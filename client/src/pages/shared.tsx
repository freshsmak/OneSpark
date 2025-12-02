import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SharedSparkData {
  id: number;
  category: string;
  conceptName: string;
  conceptTagline: string;
  painSolved: string;
  description: string;
  features: string[];
  pricePoint: string;
  vibe: string;
  image: string | null;
  sharedAt: string;
}

export default function SharedSparkPage() {
  const [, params] = useRoute("/shared/:shareId");
  const shareId = params?.shareId;

  const { data: spark, isLoading, error } = useQuery<SharedSparkData>({
    queryKey: ["/api/shared", shareId],
    queryFn: async () => {
      const res = await fetch(`/api/shared/${shareId}`);
      if (!res.ok) {
        throw new Error("Spark not found");
      }
      return res.json();
    },
    enabled: !!shareId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-white animate-pulse" />
          </div>
          <p className="text-white/60 font-mono">Loading spark...</p>
        </div>
      </div>
    );
  }

  if (error || !spark) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a1a] flex items-center justify-center p-4">
        <Card className="bg-[#1a1a3e] border-white/10 text-white max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Spark Not Found</h2>
            <p className="text-white/60 mb-6">This shared spark doesn't exist or has been removed.</p>
            <Button
              onClick={() => window.location.href = "/"}
              className="bg-white text-black hover:bg-gray-200"
              data-testid="button-go-home"
            >
              Go to ONE SPARK
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a1a] text-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-white/50 uppercase mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          Shared from ONE SPARK
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          
          <Card className="relative overflow-hidden bg-[#1a1a3e] border-white/10 text-white shadow-2xl rounded-xl min-h-[600px] flex flex-col">
            
            <div className="relative w-full h-48 bg-[#0f0f23] overflow-hidden">
              {spark.image ? (
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={spark.image} 
                  alt={spark.conceptName}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[#0f0f23] to-[#1a1a3e]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a3e] via-transparent to-transparent" />
            </div>
            
            <CardHeader className="relative z-10 pb-2 -mt-12">
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs font-medium tracking-widest text-white/70 uppercase flex items-center gap-2 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                  <Sparkles className="w-3 h-3 text-primary" />
                  One Spark • {spark.category}
                </div>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-display font-bold text-white tracking-tight mb-1 drop-shadow-lg"
                data-testid="text-spark-name"
              >
                {spark.conceptName}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-primary font-medium font-display drop-shadow-md"
              >
                {spark.conceptTagline}
              </motion.p>
            </CardHeader>

            <CardContent className="relative z-10 flex-1 flex flex-col gap-6 pt-4 overflow-y-auto">
              
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
                  "{spark.painSolved}"
                </p>
              </motion.div>

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
                  {spark.description}
                </p>
                
                <div className="space-y-2">
                  {spark.features.map((feature, i) => (
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-auto grid grid-cols-2 gap-4"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Price Point</div>
                  <div className="text-lg font-bold text-yellow-400 font-mono">{spark.pricePoint}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Vibe</div>
                  <div className="text-xs text-gray-300 italic leading-tight">{spark.vibe}</div>
                </div>
              </motion.div>

            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8"
      >
        <Button 
          onClick={() => window.location.href = "/"}
          variant="outline" 
          className="border-white/20 hover:bg-white/10 text-white gap-2"
          data-testid="button-create-own"
        >
          <ExternalLink className="w-4 h-4" />
          Create Your Own Spark
        </Button>
      </motion.div>
    </div>
  );
}
