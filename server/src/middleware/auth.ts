import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import User from '../models/User.js';
import { AppError } from './errorHandler.js';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
      return next(new AppError('Not authorized, no token', 401));
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError('User not found', 401));
    }
    
    if (user.status === 'suspended') {
      return next(new AppError('Account suspended', 403));
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(new AppError('Not authorized, token failed', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      return next(new AppError('Not authorized for this action', 403));
    }
    next();
  };
};
