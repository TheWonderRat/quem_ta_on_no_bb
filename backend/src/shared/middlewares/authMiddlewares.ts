import { Request, Response, NextFunction as Next } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import AppError from '../errors/AppError';

const { verify } = jsonwebtoken;

type jwtEnv = { jwtSecret: string, expiresIn: string } ;

const authConfig: jwtEnv = {
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  expiresIn: process.env.JWT_EXPIRATION || '1d',
};

async function isAuthenticated(req: Request, __res: Response, next: Next):
Promise<void | AppError> {
  const authHeader: string | boolean = req.headers.authorization ?? false;

  if (authHeader === false) {
    return new AppError('User is not authenticated!');
  }

  try {
    // TODO:: refresh token?
    const [, token] = authHeader.split(' ');
    verify(token, authConfig.jwtSecret, { complete: true });
    return next();
  } catch (error) {
    return next(new AppError('User is not authenticated'));
  }
}

export default isAuthenticated;
