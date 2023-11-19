// libraries
import { Request, Response, NextFunction as Next } from 'express';

// types
import { jwtTypes } from '../types/exporter';

// utils
import { AuthError, RequestError, TokenManager, RequestValidators } from '../shared/utils/exporter';

export default class AuthMid {
  public static hasToken(req: Request, __res: Response, next: Next): void {
    const authHeader: jwtTypes.authorization = req.headers as jwtTypes.authorization;
    try {
      RequestValidators.authorizationField(authHeader);
      next();
    } catch (e) {
      const exception: RequestError = e as RequestError;
      next(exception);
    }
  }

  public static hasValidToken(request: Request, __response: Response, next: Next): void {
    try {
      const positionArray: number = 1;
      const token: string = request.headers
        .authorization?.split('Bearer ')[positionArray] as string;
      TokenManager.validateToken(token);
      next();
    } catch (e) {
      const exception: AuthError = e as AuthError;
      next(exception);
    }
  }
}
