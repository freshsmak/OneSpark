import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (Required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (Required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Sparks storage table
export const sparks = pgTable("sparks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  category: varchar("category").notNull(),
  conceptName: varchar("concept_name").notNull(),
  conceptTagline: text("concept_tagline").notNull(),
  painSolved: text("pain_solved").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").notNull().$type<string[]>(),
  pricePoint: varchar("price_point").notNull(),
  vibe: text("vibe").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSparkSchema = createInsertSchema(sparks).omit({
  id: true,
  createdAt: true,
});

export type InsertSpark = typeof sparks.$inferInsert;
export type Spark = typeof sparks.$inferSelect;

// Shared sparks for secret link sharing
export const sharedSparks = pgTable("shared_sparks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sparkId: integer("spark_id").notNull().references(() => sparks.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type SharedSpark = typeof sharedSparks.$inferSelect;
export type InsertSharedSpark = typeof sharedSparks.$inferInsert;
