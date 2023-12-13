// library imports
import { Request, Response, NextFunction as Next } from 'express';

// SSOT
import { httpStatus, errorMessages } from '../SSOT/exporter';

// Types
import { errorTypes } from '../types/exporter';

// interfaces
import { IError } from '../interfaces/error.interface';

export default class ErrorMid {
  public static errorHandler(
    error: IError<errorTypes.ErrorTypes>,
    __req: Request,
    res: Response,
    __next: Next,
  ): Response {
    if (!error.errorInfo) {
      console.error(error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: errorMessages.SERVER_SIDE_ERROR });
    }

    const { statusCode, message }: errorTypes.ErrorTypes = error.errorInfo;
    return res.status(statusCode).send({ message });
  }
}
