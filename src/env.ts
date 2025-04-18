import "dotenv/config";
import { z as zod } from "zod";

const envSchema = zod.object({
  CORS_ORIGIN: zod.string().optional().default("*"),

  BASE_URL: zod.string(),
  PORT: zod.coerce.number().optional().default(3000),

  DB_PORT: zod.number().default(5432),
  DB_HOST: zod.string().default("localhost"),
  DB_USER: zod.string().default("postgres"),
  DB_PASSWORD: zod.string().default("postgres"),
  DB_NAME: zod.string().default("schedule_db"),

  DATABASE_URL: zod.string(),
});

export default envSchema.parse(process.env);
