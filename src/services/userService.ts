import { eq, desc, asc, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { db } from '../db';
import { users, User, NewUser, UpdateUser, LoginData } from '../db/schema';
import { NotFoundError, AuthenticationError } from '../utils/errors';

export class UserService {
  static async list(options: {
    page?: number;
    per_page?: number;
    sort?: string;
    fields?: string[];
  } = {}) {
    const {
      page = 1,
      per_page = 20,
      sort,
      fields = []
    } = options;

    const offset = (page - 1) * per_page;
    let orderBy: any = { createdAt: desc };
    
    if (sort) {
      const [field, order] = sort.split(':');
      orderBy = { [field]: order === 'desc' ? desc : asc };
    }

    const select: Record<string, boolean> = {};
    if (fields.length > 0) {
      fields.forEach(field => {
        if (field in users) {
          select[field] = true;
        }
      });
    }

    const [items, [{ count }]] = await Promise.all([
      db.query.users.findMany({
        limit: per_page,
        offset,
        orderBy,
        columns: fields.length > 0 ? select : undefined,
      }),
      db.select({ count: sql<number>`count(*)` }).from(users)
    ]);

    return {
      items: items.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
      total: Number(count),
      page,
      per_page
    };
  }

  static async create(data: NewUser): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, config.bcryptRounds);
    
    const [user] = await db.insert(users)
      .values({
        ...data,
        password: hashedPassword,
        role: data.role || 'user'
      })
      .returning();

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async login(data: LoginData): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, data.email)
    });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  static async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async update(id: string, data: UpdateUser): Promise<Omit<User, 'password'>> {
    const [user] = await db.update(users)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundError('User');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async delete(id: string): Promise<void> {
    const result = await db.delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    if (!result.length) {
      throw new NotFoundError('User');
    }
  }
}