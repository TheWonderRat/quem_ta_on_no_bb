// types
import { ServiceTypes } from '../types/services/serviceTypes';

export default abstract class AbstractController<T extends ServiceTypes> {
  private readonly _service: T;

  constructor(service: T) { this._service = service; }

  protected get service(): T { return this._service; }

  // protected abstract bindMethods(): void;
}
