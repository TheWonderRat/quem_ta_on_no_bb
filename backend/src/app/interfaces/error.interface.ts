// types
import { errorTypes } from '../types/exporter';

export interface IError<T extends errorTypes.ErrorTypes> {
  readonly _errorInfo: T;

  get errorInfo(): T;
}
