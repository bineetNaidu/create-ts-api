import { NextFunction, Request, Response } from 'express';

const NotFoundError = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export { NotFoundError };
