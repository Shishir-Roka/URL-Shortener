import("dotenv/config");
import { defineConfig } from "drizzle-kit";


export default  defineConfig({
  dialect: "postgresql",
  schema: "./Module/user.model.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});