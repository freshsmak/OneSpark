import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { generateProductConcept } from "./ai";
import { generateProductImage } from "./imageGen";

export async function registerRoutes(
  httpServer: Server | null,
  app: Express
): Promise<Server | null | void> {

  // AI-powered product concept generation with matching image
  app.post("/api/generate-spark", async (req: Request, res: Response) => {
    // Debug: Log env var status on every request
    console.log("=== ENV VAR DEBUG ===");
    console.log("ANTHROPIC_API_KEY:", process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING");
    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "SET" : "MISSING");
    console.log("AI_INTEGRATIONS_ANTHROPIC_API_KEY:", process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY ? "SET" : "MISSING");
    console.log("AI_INTEGRATIONS_GEMINI_API_KEY:", process.env.AI_INTEGRATIONS_GEMINI_API_KEY ? "SET" : "MISSING");
    console.log("=====================");

    try {
      const { category, painPoints } = req.body;

      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }

      // Generate the product concept first
      const concept = await generateProductConcept(category, painPoints || []);

      // Generate a matching product image
      let imageUrl: string | null = null;
      try {
        imageUrl = await generateProductImage({
          name: concept.name,
          tagline: concept.tagline,
          category: category,
          description: concept.description,
          vibe: concept.vibe,
        });
      } catch (imageError) {
        console.error("Image generation failed, continuing without image:", imageError);
      }

      res.json({
        ...concept,
        image: imageUrl,
      });
    } catch (error: any) {
      console.error("Error generating AI spark:", error);
      res.status(500).json({
        message: "Failed to generate product concept",
        error: error.message
      });
    }
  });

  return httpServer;
}
