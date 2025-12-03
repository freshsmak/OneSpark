import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, getUserId, getAuthenticatedUser } from "./clerkAuth";
import { insertSparkSchema, type InsertSpark } from "@shared/schema";
import { generateProductConcept } from "./ai";
import { generateProductImage } from "./imageGen";
import { ZodError } from "zod";

export async function registerRoutes(
  httpServer: Server | null,
  app: Express
): Promise<Server | void> {
  // Auth middleware
  setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Get authenticated user and sync to database
      const authUser = await getAuthenticatedUser(req, true);
      if (!authUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Return user from database (synced from Clerk)
      const user = await storage.getUser(userId);
      if (!user) {
        // If user not in DB yet, return auth user data
        return res.json({
          id: authUser.userId,
          email: authUser.email,
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          profileImageUrl: authUser.profileImageUrl,
        });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Spark routes
  app.post("/api/sparks", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Validate request body using Zod schema
      const validatedData = insertSparkSchema.parse(req.body);

      const sparkData: InsertSpark = {
        ...validatedData,
        userId,
      } as InsertSpark;

      const spark = await storage.createSpark(sparkData);
      res.status(201).json(spark);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      console.error("Error creating spark:", error);
      res.status(400).json({ message: "Failed to create spark" });
    }
  });

  app.get("/api/sparks", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userSparks = await storage.getUserSparks(userId);
      res.json(userSparks);
    } catch (error) {
      console.error("Error fetching sparks:", error);
      res.status(500).json({ message: "Failed to fetch sparks" });
    }
  });

  app.get("/api/sparks/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const sparkId = parseInt(req.params.id);
      if (isNaN(sparkId)) {
        return res.status(400).json({ message: "Invalid spark ID" });
      }

      const spark = await storage.getSpark(sparkId);

      if (!spark) {
        return res.status(404).json({ message: "Spark not found" });
      }

      // Verify user owns this spark
      const userId = getUserId(req);
      if (!userId || spark.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.json(spark);
    } catch (error) {
      console.error("Error fetching spark:", error);
      res.status(500).json({ message: "Failed to fetch spark" });
    }
  });

  // AI-powered product concept generation with matching image
  app.post("/api/generate-spark", async (req: Request, res: Response) => {
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
