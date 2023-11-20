// library
import { Request, Response, NextFunction as Next } from 'express';

// utils
import { RequestValidators } from '../shared/utils/exporter';

export default class UserMid {
  public static validateUserFields(request: Request, __response: Response, next: Next): void {
    try {
      RequestValidators.userRegisterFields(request.body);
      next();
    } catch (error) {
      next(error);
    }
  }
}
