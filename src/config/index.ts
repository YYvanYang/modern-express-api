import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  dbUrl: process.env.DATABASE_URL!,
  nodeEnv: process.env.NODE_ENV || 'development',
  bcryptRounds: 10,
  jwtExpiresIn: '1d'
} as const;