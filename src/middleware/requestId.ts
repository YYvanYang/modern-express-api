import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  req.id = req.headers['x-request-id']?.toString() || uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
};