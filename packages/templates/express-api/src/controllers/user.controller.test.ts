import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Request, Response } from 'express';
import { UserController } from './user.controller.js';
import { UserService } from '@/services/user.service.js';

describe('UserController Unit Tests', () => {
  let userController: UserController;
  let mockUserService: UserService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockUserService = {
      getAllUsers: vi.fn(),
      getUserById: vi.fn(),
      createUser: vi.fn(),
    } as unknown as UserService;

    userController = new UserController(mockUserService);

    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('getUsers', () => {
    it('should return 200 with list of users', async () => {
      const mockUsers = [{ id: '1', username: 'alex', email: 'alex@example.com', createdAt: new Date() }];
      vi.spyOn(mockUserService, 'getAllUsers').mockResolvedValue(mockUsers);

      await userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUsers });
    });
  });

  describe('getUserById', () => {
    it('should return 200 with matching user', async () => {
      const mockUser = { id: '1', username: 'alex', email: 'alex@example.com', createdAt: new Date() };
      mockRequest.params = { id: '1' };
      const getUserByIdSpy = vi.spyOn(mockUserService, 'getUserById').mockResolvedValue(mockUser);

      await userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUser });
    });
  });

  describe('createUser', () => {
    it('should return 201 with created user', async () => {
      const dto = { username: 'alex', email: 'alex@example.com' };
      const createdUser = { id: '1', ...dto, createdAt: new Date() };
      mockRequest.body = dto;
      const createUserSpy = vi.spyOn(mockUserService, 'createUser').mockResolvedValue(createdUser);

      await userController.createUser(mockRequest as Request, mockResponse as Response);

      expect(createUserSpy).toHaveBeenCalledWith(dto);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: createdUser });
    });
  });
});
