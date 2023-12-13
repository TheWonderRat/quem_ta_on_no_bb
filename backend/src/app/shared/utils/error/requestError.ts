// types
import { errorTypes } from '../../../types/exporter';

// interface
import { IError } from '../../../interfaces/error.interface';

export default class RequestError extends Error implements IError<errorTypes.RequestError> {
  public readonly _errorInfo: errorTypes.RequestError;

  constructor(erroInfo: errorTypes.RequestError) {
    super(erroInfo.message);

    this._errorInfo = erroInfo;
  }

  public get errorInfo(): errorTypes.RequestError { return this._errorInfo; }
}
