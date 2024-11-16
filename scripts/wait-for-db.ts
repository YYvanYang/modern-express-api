import { Client } from 'pg';
import { config } from '../src/config';

async function waitForDb() {
  const client = new Client({
    connectionString: config.dbUrl
  });

  let retries = 5;
  while (retries > 0) {
    try {
      await client.connect();
      console.log('Database connected successfully');
      await client.end();
      process.exit(0);
    } catch (err) {
      console.log(`Waiting for database... (${retries} retries left)`);
      retries -= 1;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.error('Failed to connect to database');
  process.exit(1);
}

waitForDb();