import {
  users,
  sparks,
  type User,
  type UpsertUser,
  type InsertSpark,
  type Spark,
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
}

export const storage = new DatabaseStorage();
