import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, uuid, varchar, text, index } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: text().notNull(),
  salt: text().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(()=>new Date()),
});
