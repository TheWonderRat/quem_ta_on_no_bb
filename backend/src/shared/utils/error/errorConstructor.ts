import { errorTypes, ErrorMessages, httpStatus } from '../../../types/exporter';

export default class AppError extends Error {
  private readonly _errorInfo: errorTypes.AppErrorTypes;

  constructor(message: string | ErrorMessages, statusCode: httpStatus.HttpStatusError) {
    super(message);

    this._errorInfo = {
      message,
      statusCode,
    };
  }

  public get errorInfo(): errorTypes.AppErrorTypes {
    return this._errorInfo;
  }
}
