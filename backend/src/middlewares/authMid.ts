// libraries
import { Request, Response, NextFunction as Next } from 'express';

// types
import { jwt } from '../types/exporter';

// utils
import AppError from '../shared/utils/error/errorConstructor';
import authValidation from '../shared/utils/auth/authValidation';
import validateToken from '../shared/utils/jwt/validateToken';

export default class AuthMid {
  public static hasToken(req: Request, __res: Response, next: Next): void {
    const authHeader: jwt.authorization = req.headers as jwt.authorization;
    try {
      authValidation(authHeader);
      next();
    } catch (e) {
      const exception: AppError = e as AppError;
      next(exception);
    }
  }

  public static hasValidToken(request: Request, __response: Response, next: Next): void {
    try {
      const positionArray: number = 1;
      const token: string = request.headers
        .authorization?.split('Bearer ')[positionArray] as string;
      validateToken(token);
      next();
    } catch (e) {
      const exception: AppError = e as AppError;
      next(exception);
    }
  }
}
