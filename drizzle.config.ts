import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

let connectionString = process.env.DATABASE_URL;

if (!connectionString)
  throw new Error(
    "`DATABASE_URL` or `DATABASE_TEST_URL` not found in environment"
  );

export default defineConfig({
  schema: "./src/database/schemas/invoice-system",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
  strict: true,
});
