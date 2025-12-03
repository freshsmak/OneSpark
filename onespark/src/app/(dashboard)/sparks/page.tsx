'use client'

import { useState } from 'react'
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { generateSpark } from '@/lib/spark-engine'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Zap } from 'lucide-react'
import type { SparkResult } from '@/lib/spark-engine'

export default function SparksPage() {
  const { user } = useUser()
  const [spark, setSpark] = useState<SparkResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const result = await generateSpark()
      setSpark(result)
      
      // Save to Supabase
      if (user?.id) {
        // Extract price_min and price_max from price_point string (e.g., "$89" or "$49-99")
        let priceMin: number | undefined
        let priceMax: number | undefined
        if (result.concept.price_point) {
          const priceMatch = result.concept.price_point.match(/\$?(\d+)(?:-(\d+))?/)
          if (priceMatch) {
            priceMin = parseInt(priceMatch[1])
            priceMax = priceMatch[2] ? parseInt(priceMatch[2]) : priceMin
          }
        }

        await fetch('/api/sparks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: result.category,
            name: result.concept.name,
            tagline: result.concept.tagline,
            pain_point: result.concept.pain_solved,
            description: result.concept.description,
            features: result.concept.features,
            price_min: priceMin,
            price_max: priceMax,
            vibe: result.concept.vibe,
            image_url: result.concept.image,
            is_saved: false,
            is_ai_generated: result.isAIGenerated || false,
          }),
        })
      }
    } catch (error) {
      console.error('Failed to generate spark:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-4xl mx-auto">
        <SignedIn>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" />
              OneSpark
            </h1>
            <p className="text-muted-foreground">
              Generate product concepts from real consumer pain points
            </p>
          </div>

        {!spark && !isGenerating && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleGenerate}
              size="lg"
              className="h-16 px-8 text-lg"
            >
              <Zap className="mr-2 w-5 h-5" />
              Generate Spark
            </Button>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center mt-12 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Generating your spark...</p>
          </div>
        )}

        {spark && !isGenerating && (
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{spark.concept.name}</CardTitle>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {spark.category}
                </span>
              </div>
              <p className="text-lg text-primary font-medium mt-2">
                {spark.concept.tagline}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-destructive">The Problem</h3>
                <p className="text-sm text-muted-foreground">
                  {spark.concept.pain_solved}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-primary">The Solution</h3>
                <p className="text-sm mb-4">{spark.concept.description}</p>
                <ul className="space-y-2">
                  {spark.concept.features.map((feature, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-6 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Price Point</p>
                  <p className="font-bold text-lg">{spark.concept.price_point}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vibe</p>
                  <p className="text-sm italic">{spark.concept.vibe}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleGenerate} variant="outline" className="w-full">
                  Generate Another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        </SignedIn>
        <SignedOut>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Please sign in to generate sparks.
            </p>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}

