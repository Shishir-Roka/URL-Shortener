import("dotenv/config");
import { defineConfig } from "drizzle-kit";


export default  defineConfig({
  dialect: "postgresql",
  schema: "./Modules/index.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
