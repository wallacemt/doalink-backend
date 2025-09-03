import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  POSTGREE_URI: z.string().min(1),
  PORT: z.string().min(1),
  FRONTEND_URL: z
    .string({
      invalid_type_error: "Expected array, received string",
    })
    .transform((urlsString) => {
      const urls = JSON.parse(urlsString);
      //biome-ignore lint:regex is correct
      return urls.map((url: string) => url.replace(/\/$/, ""));
    }),
  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
