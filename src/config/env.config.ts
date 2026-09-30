import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(9000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL es requerida'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET es requerido'),
  JWT_EXPIRES_IN: z.string().default('1d'),
});

export type TEnvConfig = z.infer<typeof envSchema>;

export const validateEnv = (config: Record<string, unknown>): TEnvConfig => {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Error de validación en variables de entorno:\n${result.error.message}`);
  }
  return result.data;
};
