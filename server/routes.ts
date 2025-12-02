import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSparkSchema } from "@shared/schema";

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

  return httpServer;
}
