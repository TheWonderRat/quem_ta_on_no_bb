// library
import { Request, Response, NextFunction as Next } from 'express';

// Types
import { requestTypes as RT } from '../types/exporter';

// utils
import { RequestValidators } from '../shared/utils/exporter';

export default class UserMid {
  public static validateFormat(request: Request, __response: Response, next: Next): void {
    try {
      RequestValidators.arrayValidator(request.body);
      next();
    } catch (error) {
      next(error);
    }
  }

  public static validateUserFields(request: Request, __response: Response, next: Next): void {
    try {
      const newUsers: RT.NewUserRequest[] = request.body;
      newUsers.forEach((newUser: RT.NewUserRequest) => {
        RequestValidators.userRegisterFields(newUser);
        RequestValidators.userRegisterNumberFields(newUser);
        RequestValidators.userRegisterBooleanFields(newUser);
      });
      next();
    } catch (error) {
      next(error);
    }
  }
}
