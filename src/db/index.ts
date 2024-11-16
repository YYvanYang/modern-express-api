import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config';
import * as schema from './schema';

const pool = new Pool({
  connectionString: config.dbUrl,
  max: 20
});

export const db = drizzle(pool, { schema });