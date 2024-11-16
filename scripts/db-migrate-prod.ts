import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '../src/db';

async function runProductionMigrations() {
  try {
    console.log('Starting production database migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Production migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Production migration failed:', error);
    process.exit(1);
  }
}

runProductionMigrations();