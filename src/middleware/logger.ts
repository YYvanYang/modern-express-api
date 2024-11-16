import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  if (config.nodeEnv === 'development') {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    });
  }
  next();
};