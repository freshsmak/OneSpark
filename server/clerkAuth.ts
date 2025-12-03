import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { storage } from "./storage";
import type { UpsertUser } from "@shared/schema";

// Extend Express Request to include Clerk user
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string | null;
        sessionId: string | null;
      };
    }
  }
}

/**
 * Setup Clerk authentication middleware
 * This should be called before any routes that need authentication
 */
export function setupAuth(app: Express) {
  // Initialize Clerk middleware
  app.use(clerkMiddleware());
}

/**
 * Authentication middleware that verifies user is authenticated
 * Returns 401 if not authenticated
 */
export const isAuthenticated: RequestHandler = requireAuth({
  onUnauthenticated: (_req: Request, res: Response) => {
    return res.status(401).json({ message: "Unauthorized" });
  },
});

/**
 * Get the current authenticated user from Clerk
 * Optionally syncs user data to local database
 */
export async function getAuthenticatedUser(req: Request, syncToDb = true) {
  const auth = getAuth(req);
  
  if (!auth.userId) {
    return null;
  }

  try {
    // Fetch full user data from Clerk's Backend API
    const clerkUser = await clerkClient.users.getUser(auth.userId);
    
    // Extract user information
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    );
    const firstName = clerkUser.firstName || undefined;
    const lastName = clerkUser.lastName || undefined;
    const profileImageUrl = clerkUser.imageUrl || undefined;

    // Sync to local database if requested
    if (syncToDb) {
      try {
        const userData: UpsertUser = {
          id: clerkUser.id,
          email: primaryEmail?.emailAddress,
          firstName,
          lastName,
          profileImageUrl,
        };

        await storage.upsertUser(userData);
      } catch (error) {
        console.error("Error syncing user to database:", error);
      }
    }

    return {
      userId: clerkUser.id,
      sessionId: auth.sessionId,
      email: primaryEmail?.emailAddress,
      firstName,
      lastName,
      profileImageUrl,
    };
  } catch (error) {
    console.error("Error fetching user from Clerk:", error);
    // Fallback to session claims if API call fails
    return {
      userId: auth.userId,
      sessionId: auth.sessionId,
      email: auth.sessionClaims?.email as string | undefined,
      firstName: auth.sessionClaims?.firstName as string | undefined,
      lastName: auth.sessionClaims?.lastName as string | undefined,
      profileImageUrl: auth.sessionClaims?.imageUrl as string | undefined,
    };
  }
}

/**
 * Helper to get user ID from request
 */
export function getUserId(req: Request): string | null {
  const auth = getAuth(req);
  return auth.userId;
}

