import { Router } from 'express';

const r = Router();

r.get('/', (_req, res) => {
  res.json({
    msg: 'Hello API',
  });
});

export { r as apiRoutes };
