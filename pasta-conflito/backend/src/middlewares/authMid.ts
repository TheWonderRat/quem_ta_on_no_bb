// libraries
import { Request, Response, NextFunction as Next } from 'express';

// types
import { authorization } from '../types/exporter';

// utils
import AppError from '../shared/utils/error/errorConstructor';
import authValidation from '../shared/utils/auth/authValidation';
import validateToken from '../shared/utils/jwt/validateToken';

export default class AuthMid {
  public static hasToken(req: Request, __res: Response, next: Next): void {
    const authHeader = req.headers as authorization;
    try {
      authValidation(authHeader);
      next();
    } catch (e) {
      const exception = e as AppError;
      next(exception);
    }
  }

  public static hasValidToken(request: Request, __response: Response, next: Next): void {
    try {
      const token = request.headers.authorization?.split('Bearer ')[1] as string;
      validateToken(token);
      next();
    } catch (e) {
      const exception = e as AppError;
      next(exception);
    }
  }
}
