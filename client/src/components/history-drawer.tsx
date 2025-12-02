import { SparkResult } from "@/lib/spark-engine";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { History, Sparkles, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface HistoryDrawerProps {
  history: SparkResult[];
  onSelect: (spark: SparkResult) => void;
}

export function HistoryDrawer({ history, onSelect }: HistoryDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 gap-2"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">History</span>
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 min-w-[20px] bg-primary/20 text-primary border-none">
            {history.length}
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#0f0f23] border-t border-white/10 text-white h-[85vh]">
        <div className="mx-auto w-full max-w-4xl flex flex-col h-full">
          <DrawerHeader className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex flex-col items-start gap-1">
              <DrawerTitle className="text-2xl font-display font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Spark History
              </DrawerTitle>
              <p className="text-sm text-muted-foreground">
                Your previously generated concepts (Pro Feature)
              </p>
            </div>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-500/10 gap-1">
              <Lock className="w-3 h-3" />
              V2 PREVIEW
            </Badge>
          </DrawerHeader>
          
          <ScrollArea className="flex-1 p-4">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4 min-h-[300px]">
                <History className="w-12 h-12 opacity-20" />
                <p>No sparks generated yet. Start ideating!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
                {history.map((spark, index) => (
                  <div 
                    key={index}
                    onClick={() => onSelect(spark)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {/* Image Thumbnail */}
                    <div className="h-32 w-full overflow-hidden bg-black/50">
                      {spark.concept.image ? (
                        <img 
                          src={spark.concept.image} 
                          alt={spark.concept.name}
                          className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                          {spark.category}
                        </span>
                        <span className="text-[10px] font-mono text-primary">
                          {spark.concept.price_point}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                        {spark.concept.name}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {spark.concept.tagline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
