import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const getServerDBConfig = () => {
  return createEnv({
    client: {},
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
    server: {
      DATABASE_URL: z.string(),
    },
  });
};

export const serverDBEnv = getServerDBConfig();
