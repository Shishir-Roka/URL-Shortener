import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, uuid, varchar, text, index } from "drizzle-orm/pg-core";
const { sql } = require("drizzle-orm");


export const usersTable = pgTable("users",{
 id: uuid("id").defaultRandom().primaryKey(),

 firstName: varchar("first_name",{length:50}).notNull(),
 lastName: varchar("last_name",{length:50}).notNull(),

 email:varchar({length:255}).notNull().unique(),
 
 password: text().notNull(),
 salt:text().notNull(),

 createdAt: timestamp("created_At").defaultNow().notNull(),
 updateAt: timestamp("updated_At").$onUpdate(()=> new Date()),

}) 