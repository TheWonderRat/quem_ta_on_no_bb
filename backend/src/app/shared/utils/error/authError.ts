// Types
import { errorTypes } from '../../../types/exporter';

// Interface
import { IError } from '../../../interfaces/error.interface';

export default class AuthError extends Error implements IError<errorTypes.AuthError> {
  public readonly _errorInfo: errorTypes.AuthError;

  constructor(erroInfo: errorTypes.AuthError) {
    super(erroInfo.message);

    this._errorInfo = erroInfo;
  }

  public get errorInfo(): errorTypes.AuthError { return this._errorInfo; }
}
