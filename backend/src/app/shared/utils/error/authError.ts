// Types
import { errorTypes } from '../../../types/exporter';

// Interface
import { IError } from '../../../interfaces/error.interface';

export default class AuthError extends Error implements IError<errorTypes.AuthErrorTypes> {
  public readonly _errorInfo: errorTypes.AuthErrorTypes;

  constructor(erroInfo: errorTypes.AuthErrorTypes) {
    super(erroInfo.message);

    this._errorInfo = erroInfo;
  }

  public get errorInfo(): errorTypes.AuthErrorTypes { return this._errorInfo; }
}
