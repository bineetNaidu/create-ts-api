import { Router } from 'express';
import { HealthController } from '@/controllers/health.controller.js';
import { UserController } from '@/controllers/user.controller.js';
import { UserService } from '@/services/user.service.js';
import { createHealthRouter } from './health.routes.js';
import { createUserRouter } from './user.routes.js';

/**
 * Centralized Application Router Composition
 * Instantiates dependencies top-to-bottom and wires controllers into Express routes.
 */
export const createApiRouter = (): Router => {
  const router = Router();

  // Instantiate services
  const userService = new UserService();

  // Instantiate controllers
  const healthController = new HealthController();
  const userController = new UserController(userService);

  // Mount feature routers
  router.use('/health', createHealthRouter(healthController));
  router.use('/users', createUserRouter(userController));

  return router;
};
