// types
import { errorTypes } from '../../../types/exporter';

// interface
import { IError } from '../../../interfaces/error.interface';

export default class ServerError extends Error implements IError<errorTypes.ServerError> {
  public readonly _errorInfo: errorTypes.ServerError;

  constructor(erroInfo: errorTypes.ServerError) {
    super(erroInfo.message);

    this._errorInfo = erroInfo;
  }

  public get errorInfo(): errorTypes.ServerError { return this._errorInfo; }
}
