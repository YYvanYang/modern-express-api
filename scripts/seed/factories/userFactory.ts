import { faker } from '@faker-js/faker';
import { UserSeed } from '../../../src/db/schema/types';

export function createUser(overrides: Partial<UserSeed> = {}): UserSeed {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    role: 'user',
    ...overrides,
  };
}

export function createUsers(count: number): UserSeed[] {
  return Array.from({ length: count }, () => createUser());
}