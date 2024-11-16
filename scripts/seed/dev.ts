import { createUsers } from './factories/userFactory';
import { db } from '../../src/db';
import { users as usersTable } from '../../src/db/schema';
import { hashPasswords } from './users';

async function seedDevelopmentData(): Promise<void> {
  try {
    console.log('🌱 Seeding development data...');

    // 创建测试用户
    const testUsers = createUsers(50);  // 创建50个测试用户
    const hashedUsers = await hashPasswords(testUsers);

    // 批量插入用户
    await db.insert(usersTable).values(
      hashedUsers.map((user) => ({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log('✅ Development seed completed!');
  } catch (error) {
    console.error('❌ Development seed failed:', error);
    throw error;
  }
}

// 如果直接运行此文件
if (require.main === module) {
  void seedDevelopmentData();
}

export { seedDevelopmentData };