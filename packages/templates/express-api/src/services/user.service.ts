import { ConflictError, NotFoundError } from '@/lib/errors/index.js';
import type { User } from '@/types/user.type.js';
import type { CreateUserDTO } from '@/schemas/user.schema.ts';

/**
 * Pure Business Logic Layer
 * Independent of Express req/res context for isolated unit testing and reusability.
 */
export class UserService {
  private users: User[] = [];

  public async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  public async getUserById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundError(`User with ID "${id}" not found`);
    }
    return user;
  }

  public async createUser(dto: CreateUserDTO): Promise<User> {
    const existing = this.users.find((u) => u.email === dto.email);
    if (existing) {
      throw new ConflictError(`User with email "${dto.email}" already exists`, {
        details: [{ field: 'email', value: dto.email }],
      });
    }

    const newUser: User = {
      id: (this.users.length + 1).toString(),
      username: dto.username,
      email: dto.email,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }
}
