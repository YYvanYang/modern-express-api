import { z } from 'zod';

export const productionConfigSchema = z.object({
  port: z.number().int().positive(),
  database: z.object({
    url: z.string().url(),
    maxConnections: z.number().int().positive().default(20),
    idleTimeoutMillis: z.number().int().positive().default(30000),
    connectionTimeoutMillis: z.number().int().positive().default(5000),
  }),
  security: z.object({
    corsOrigins: z.array(z.string().url()).min(1),
    trustProxy: z.boolean().default(true),
    rateLimiting: z.object({
      windowMs: z.number().int().positive(),
      maxRequests: z.number().int().positive(),
    }),
  }),
  jwt: z.object({
    secret: z.string().min(32),
    expiresIn: z.string(),
  }),
  logging: z.object({
    level: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
    format: z.enum(['json', 'text']).default('json'),
  }),
});