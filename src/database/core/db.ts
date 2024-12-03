import { serverDBEnv } from "@/config/db";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/database/schemas/invoice-system";

export const getDBInstance = (): PostgresJsDatabase<typeof schema> => {
  let connectionString = serverDBEnv.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      `You are try to use database, but "DATABASE_URL" is not set correctly`
    );
  }

  const client = postgres(serverDBEnv.DATABASE_URL!, { prepare: false });
  return drizzle(client, { schema });
};

export const serverDB = getDBInstance();
