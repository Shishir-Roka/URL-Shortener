import { pgTable, uuid, varchar, text, index } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";
import { timestamp } from "drizzle-orm/pg-core";

export const urlsTable =pgTable("urls",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    shortCode: varchar("code", { length: 255 }).notNull().unique(),
    targetURl: varchar("target_url").notNull(),

    userID: uuid("user_Id")
      .references(() => usersTable.id)
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  });
