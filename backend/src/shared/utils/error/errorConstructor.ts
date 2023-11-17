import { errorTypes } from '../../../types/exporter';

export default class AppError extends Error {
  private readonly _errorInfo: errorTypes.AppErrorTypes;

  constructor(erroInfo: errorTypes.AppErrorTypes) {
    super(erroInfo.message);

    this._errorInfo = erroInfo;
  }

  public get errorInfo(): errorTypes.AppErrorTypes {
    return this._errorInfo;
  }
}
