import {
  users,
  sparks,
  sharedSparks,
  type User,
  type UpsertUser,
  type InsertSpark,
  type Spark,
  type SharedSpark,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Spark operations
  createSpark(spark: InsertSpark): Promise<Spark>;
  getUserSparks(userId: string): Promise<Spark[]>;
  getSpark(id: number): Promise<Spark | undefined>;
  
  // Shared spark operations
  createSharedSpark(sparkId: number): Promise<SharedSpark>;
  getSharedSpark(shareId: string): Promise<{ share: SharedSpark; spark: Spark } | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (Required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Spark operations
  async createSpark(sparkData: InsertSpark): Promise<Spark> {
    const [spark] = await db
      .insert(sparks)
      .values([sparkData])
      .returning();
    return spark;
  }

  async getUserSparks(userId: string): Promise<Spark[]> {
    return await db
      .select()
      .from(sparks)
      .where(eq(sparks.userId, userId))
      .orderBy(desc(sparks.createdAt));
  }

  async getSpark(id: number): Promise<Spark | undefined> {
    const [spark] = await db.select().from(sparks).where(eq(sparks.id, id));
    return spark;
  }

  // Shared spark operations
  async createSharedSpark(sparkId: number): Promise<SharedSpark> {
    const [shared] = await db
      .insert(sharedSparks)
      .values({ sparkId })
      .returning();
    return shared;
  }

  async getSharedSpark(shareId: string): Promise<{ share: SharedSpark; spark: Spark } | undefined> {
    const result = await db
      .select()
      .from(sharedSparks)
      .innerJoin(sparks, eq(sharedSparks.sparkId, sparks.id))
      .where(eq(sharedSparks.id, shareId));
    
    if (result.length === 0) return undefined;
    
    return {
      share: result[0].shared_sparks,
      spark: result[0].sparks,
    };
  }
}

export const storage = new DatabaseStorage();
