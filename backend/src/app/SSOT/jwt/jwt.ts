// libraries
import { SignOptions, Algorithm } from 'jsonwebtoken';

// Environment variables
export const JWT_SECRET: string = process.env.JWT_SECRET || 'default';
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRATION || '1d';
export const JWT_ALGORITHM: Algorithm = process.env.JWT_ALGORITHM as Algorithm || 'HS256';
export const JWT_SIGN_OPTIONS: SignOptions = {
  algorithm: JWT_ALGORITHM,
  expiresIn: JWT_EXPIRES_IN,
};
