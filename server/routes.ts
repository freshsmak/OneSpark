import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSparkSchema } from "@shared/schema";
import { generateProductConcept } from "./ai";
import { generateProductImage } from "./imageGen";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Spark routes
  app.post("/api/sparks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sparkData = {
        userId,
        category: req.body.category,
        conceptName: req.body.conceptName,
        conceptTagline: req.body.conceptTagline,
        painSolved: req.body.painSolved,
        description: req.body.description,
        features: req.body.features,
        pricePoint: req.body.pricePoint,
        vibe: req.body.vibe,
        image: req.body.image,
      };
      
      const spark = await storage.createSpark(sparkData);
      res.status(201).json(spark);
    } catch (error: any) {
      console.error("Error creating spark:", error);
      res.status(400).json({ message: error.message || "Failed to create spark" });
    }
  });

  app.get("/api/sparks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userSparks = await storage.getUserSparks(userId);
      res.json(userSparks);
    } catch (error) {
      console.error("Error fetching sparks:", error);
      res.status(500).json({ message: "Failed to fetch sparks" });
    }
  });

  app.get("/api/sparks/:id", isAuthenticated, async (req: any, res) => {
    try {
      const sparkId = parseInt(req.params.id);
      const spark = await storage.getSpark(sparkId);
      
      if (!spark) {
        return res.status(404).json({ message: "Spark not found" });
      }
      
      // Verify user owns this spark
      const userId = req.user.claims.sub;
      if (spark.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(spark);
    } catch (error) {
      console.error("Error fetching spark:", error);
      res.status(500).json({ message: "Failed to fetch spark" });
    }
  });

  // AI-powered product concept generation with matching image
  app.post("/api/generate-spark", async (req, res) => {
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

  // Share a spark (create secret link)
  app.post("/api/sparks/:id/share", isAuthenticated, async (req: any, res) => {
    try {
      const sparkId = parseInt(req.params.id);
      const spark = await storage.getSpark(sparkId);
      
      if (!spark) {
        return res.status(404).json({ message: "Spark not found" });
      }
      
      // Verify user owns this spark
      const userId = req.user.claims.sub;
      if (spark.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Create shared link
      const shared = await storage.createSharedSpark(sparkId);
      res.json({ shareId: shared.id });
    } catch (error) {
      console.error("Error sharing spark:", error);
      res.status(500).json({ message: "Failed to share spark" });
    }
  });

  // Get shared spark (public - no auth required)
  app.get("/api/shared/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      const result = await storage.getSharedSpark(shareId);
      
      if (!result) {
        return res.status(404).json({ message: "Shared spark not found" });
      }
      
      // Return just the spark data (not the user info for privacy)
      res.json({
        id: result.spark.id,
        category: result.spark.category,
        conceptName: result.spark.conceptName,
        conceptTagline: result.spark.conceptTagline,
        painSolved: result.spark.painSolved,
        description: result.spark.description,
        features: result.spark.features,
        pricePoint: result.spark.pricePoint,
        vibe: result.spark.vibe,
        image: result.spark.image,
        sharedAt: result.share.createdAt,
      });
    } catch (error) {
      console.error("Error fetching shared spark:", error);
      res.status(500).json({ message: "Failed to fetch shared spark" });
    }
  });

  return httpServer;
}
