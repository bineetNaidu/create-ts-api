import type { Request, Response } from 'express';

export class HealthController {
  public checkHealth = (_req: Request, res: Response): void => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  };
}
