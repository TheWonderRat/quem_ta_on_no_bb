// library imports
import { Request, Response, NextFunction as Next } from 'express';

// Types
import AuthError from '../shared/utils/error/authError';
import { errorTypes } from '../types/exporter';

export default class ErrorMid {
  public static errorHandler(
    error: AuthError,
    __req: Request,
    res: Response,
    __next: Next,
  ): Response {
    const { statusCode, message }: errorTypes.ErrorTypes = error.errorInfo;
    return res.status(statusCode).send({ message });
  }
}
