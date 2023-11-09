import { Request, Response, NextFunction as Next } from 'express';
import jsonwebtoken from 'jsonwebtoken';
// import {Jwt, JwtPayload,SignOptions,decode,verify, sign} from 'jsonwebtoken'
import authConfig from '../../config/auth.json';
import AppError from '../errors/AppError';
// Avoiding import error

const { verify } = jsonwebtoken;

async function isAuthenticated(req: Request, __res: Response, next: Next):
Promise<void | AppError> {
  const authHeader: string | boolean = req.headers.authorization ?? false;

  if (authHeader === false) {
    return new AppError('User is not authenticated!');
  }

  try {
    // TODO:: refresh token?
    const [, token] = authHeader.split(' ');
    verify(token, authConfig.jwt.secret, { complete: true });
    return next();
  } catch (error) {
    return next(new AppError('User is not authenticated'));
  }
}

export default isAuthenticated;
