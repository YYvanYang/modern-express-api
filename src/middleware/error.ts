import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
        request_id: req.id,
        timestamp: new Date().toISOString()
      }
    });
  }

  const error = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    request_id: req.id,
    timestamp: new Date().toISOString()
  };

  if (config.nodeEnv === 'development') {
    Object.assign(error, {
      stack: err.stack,
      details: err
    });
  }

  res.status(500).json({ error });
};