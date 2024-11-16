import { UserSeed } from '../../src/db/schema/types';
import bcrypt from 'bcryptjs';

export const users: UserSeed[] = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    username: 'test_user',
    email: 'user@example.com',
    password: 'User@123',
    role: 'user',
  },
];

export const hashPasswords = async (users: UserSeed[]): Promise<UserSeed[]> => {
  return Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );
};