import { db } from '../src/db';
import { users, hashPasswords } from './seed/users';
import { eq } from 'drizzle-orm';
import { users as usersTable } from '../src/db/schema';

async function seed(): Promise<void> {
  try {
    console.log('🌱 Starting database seed...');

    // 清理现有数据（可选）
    console.log('Cleaning existing data...');
    await db.delete(usersTable);

    // 准备用户数据
    console.log('Preparing user data...');
    const hashedUsers = await hashPasswords(users);

    // 插入用户
    console.log('Inserting users...');
    for (const userData of hashedUsers) {
      const existingUser = await db.query.users.findFirst({
        where: eq(usersTable.email, userData.email),
      });

      if (!existingUser) {
        await db.insert(usersTable).values({
          ...userData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`Created user: ${userData.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    // 这里可以添加其他数据的种子脚本
    // await seedOtherData();

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// 运行种子脚本
void seed();