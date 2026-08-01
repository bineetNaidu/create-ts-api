import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from './user.service.js';
import { ConflictError, NotFoundError } from '@/lib/errors/index.js';

describe('UserService Unit Tests', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('getAllUsers', () => {
    it('should return an empty array initially', async () => {
      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return all created users', async () => {
      await userService.createUser({ username: 'alex', email: 'alex@example.com' });
      await userService.createUser({ username: 'taylor', email: 'taylor@example.com' });

      const users = await userService.getAllUsers();
      expect(users).toHaveLength(2);
    });
  });

  describe('getUserById', () => {
    it('should return the user when found by ID', async () => {
      const created = await userService.createUser({ username: 'jordan', email: 'jordan@example.com' });
      const found = await userService.getUserById(created.id);

      expect(found).toEqual(created);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      await expect(userService.getUserById('999')).rejects.toThrow(NotFoundError);
    });
  });

  describe('createUser', () => {
    it('should create and return a new user with generated ID', async () => {
      const dto = { username: 'morgan', email: 'morgan@example.com' };
      const user = await userService.createUser(dto);

      expect(user).toMatchObject({
        username: 'morgan',
        email: 'morgan@example.com',
      });
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should throw ConflictError when email is already registered', async () => {
      const dto = { username: 'morgan', email: 'morgan@example.com' };
      await userService.createUser(dto);

      await expect(userService.createUser(dto)).rejects.toThrow(ConflictError);
    });
  });
});
