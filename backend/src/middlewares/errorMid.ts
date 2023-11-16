import { Request, Response, NextFunction as Next } from 'express';
import AppError from '../shared/utils/error/errorConstructor';

export default class ErrorMid {
  public static errorHandler(
    error: AppError,
    __req: Request,
    res: Response,
    __next: Next,
  ): Response {
    const { statusCode, message } = error.errorInfo;
    return res.status(statusCode).send(message);
  }
}
