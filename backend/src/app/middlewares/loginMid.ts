// library
import { Request, Response, NextFunction as Next } from 'express';

// utils
import { RequestValidators } from '../shared/utils/exporter';

export default class LoginMid {
  public static validateLoginFields(request: Request, __response: Response, next: Next): void {
    try {
      RequestValidators.loginFields(request.body);
      RequestValidators.validateEmail(request.body.email);
      next();
    } catch (error) {
      next(error);
    }
  }
}
