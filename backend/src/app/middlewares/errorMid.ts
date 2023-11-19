// library imports
import { Request, Response, NextFunction as Next } from 'express';

// interfaces
import { IError } from '../interfaces/error.interface';

// Types
import { errorTypes } from '../types/exporter';

export default class ErrorMid {
  public static errorHandler(
    error: IError<errorTypes.ErrorTypes>,
    __req: Request,
    res: Response,
    __next: Next,
  ): Response {
    const { statusCode, message }: errorTypes.ErrorTypes = error.errorInfo;
    return res.status(statusCode).send({ message });
  }
}
