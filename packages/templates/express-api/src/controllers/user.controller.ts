import type { Request, Response } from 'express';
import { UserService } from '@/services/user.service.js';

/**
 * Controller Layer (Constructor Dependency Injection)
 * Manages HTTP delivery layer by extracting inputs and returning HTTP responses.
 */
export class UserController {
  constructor(private readonly userService: UserService) {}

  public getUsers = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({ data: users });
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id!);
    res.status(200).json({ data: user });
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json({ data: user });
  };
}
