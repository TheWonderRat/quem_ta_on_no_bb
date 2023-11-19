// types
import { errorTypes } from '../../../types/exporter';

// interface
import { IError } from '../../../interfaces/error.interface';

export default class RequestError extends Error implements IError<errorTypes.RequestErrorTypes> {
  public readonly _errorInfo: errorTypes.RequestErrorTypes;

  constructor(erroInfo: errorTypes.RequestErrorTypes) {
    super(erroInfo.message);

    this._errorInfo = erroInfo;
  }

  public get errorInfo(): errorTypes.RequestErrorTypes { return this._errorInfo; }
}
