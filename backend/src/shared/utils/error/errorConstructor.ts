import { errorTypes, ErrorMessages, httpStatus } from '../../../types/exporter';

export default class AppError extends Error {
  private readonly errorInfo: errorTypes.AppErrorTypes;

  constructor(message: string | ErrorMessages, statusCode: httpStatus.HttpStatusError) {
    super(message);

    this.errorInfo = {
      message,
      statusCode,
    };
  }

  public getErrorInfo(): errorTypes.AppErrorTypes {
    return this.errorInfo;
  }
}
