import { defineConfig } from 'drizzle-kit';
import { config } from './src/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.dbUrl,
  },
  verbose: true,
  strict: true,
  migrations: {
    table: '__drizzle_migrations',
    schema: 'public'
  },
});
