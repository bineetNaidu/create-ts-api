import { Router } from 'express';
import { HealthController } from '@/controllers/health.controller.js';

export const createHealthRouter = (healthController: HealthController): Router => {
  const router = Router();
  router.get('/', healthController.checkHealth);
  return router;
};
