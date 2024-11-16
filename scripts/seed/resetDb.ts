import { db } from '../../src/db';
import { users } from '../../src/db/schema';

export async function resetDatabase(): Promise<void> {
  try {
    console.log('🗑️ Resetting database...');

    // 删除所有表的数据
    await db.delete(users);

    console.log('✅ Database reset completed!');
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    throw error;
  }
}