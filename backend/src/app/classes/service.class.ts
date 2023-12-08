// types
import { RepositoryTypes } from '../types/repositories/repositoryTypes';

export default abstract class AbstractService<T extends RepositoryTypes> {
  private readonly _repository: T;

  constructor(repository: T) { this._repository = repository; }

  protected get repository(): T { return this._repository; }
}
