import { Router } from 'express';
import { UserController } from '@/controllers/user.controller.js';
import { validateRequest } from '@/middleware/validate.middleware.js';
import { createUserSchema } from '@/schemas/user.schema.js';

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();

  router.get('/', userController.getUsers);
  router.get('/:id', userController.getUserById);
  router.post('/', validateRequest(createUserSchema), userController.createUser);

  return router;
};
