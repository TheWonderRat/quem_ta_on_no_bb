import { NextFunction, Request, Response } from 'express';
import AppError, { AppErrorType } from '@shared/errors/AppError';

import authConfig from '@config/auth';

const jsonwebtoken = require('jsonwebtoken');

const { verify } = jsonwebtoken;

export async function isAuthenticated(
  request: Request,
  response: Response,
  next:NextFunction,
): Promise<void | AppError> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    // auth header is missing
    return next(AppErrorType.MissingToken);
  }

  try {
    // TODO:: refresh token?
	  const [,token] = authHeader.split(' ');
    // const decodedToken para manipular os tokens da aplicacao
    await verify(token, authConfig.jwt.secret, { complete: true });
    return next();
  } catch (error) {
    return next(new AppError(AppErrorType.UserNotAuthenticated));
  }
}
