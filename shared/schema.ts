import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const coordinatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.enum(["faculty", "student", "tech"]),
  department: z.string().optional(),
  year: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export type Coordinator = z.infer<typeof coordinatorSchema>;
export type InsertCoordinator = Omit<Coordinator, "id">;

export const eventSchema = z.object({
  id: z.number(),
  day: z.string(),
  title: z.string(),
  subtitle: z.string(),
  date: z.string(),
  venue: z.string(),
  dressCode: z.string().optional(),
  time: z.string().optional(),
  color: z.string(),
  description: z.string(),
  extendedDescription: z.string().optional(),
  highlights: z.array(z.string()),
  sports: z.array(z.string()).optional(),
});

export type Event = z.infer<typeof eventSchema>;

export const scheduleEventSchema = z.object({
  time: z.string(),
  title: z.string(),
  description: z.string(),
});

export const scheduleSchema = z.object({
  id: z.number(),
  day: z.string(),
  title: z.string(),
  subtitle: z.string(),
  date: z.string(),
  venue: z.string(),
  color: z.string(),
  events: z.array(scheduleEventSchema),
});

export type Schedule = z.infer<typeof scheduleSchema>;
export type ScheduleEvent = z.infer<typeof scheduleEventSchema>;

export const sportSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  teamSize: z.string(),
  format: z.string(),
  color: z.string(),
  rules: z.array(z.string()),
  highlights: z.array(z.string()),
});

export type Sport = z.infer<typeof sportSchema>;
