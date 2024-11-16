export type Role = 'admin' | 'user';

export interface UserSeed {
  username: string;
  email: string;
  password: string;
  role: Role;
}