import jwt from 'jsonwebtoken';
import { config } from '../config/dotenv.config';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};