import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/dotenv.config';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error('Unauthorized');

    const decoded = jwt.verify(token, config.jwtSecret) as any;
    (req as any).user = decoded;

     next();
  } catch (err) {
     res.status(401).json({ error: 'Invalid or expired token' });
     return;
  }
};
