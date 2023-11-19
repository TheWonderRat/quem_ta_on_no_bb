export default class AbstractRepository<T> {
  private readonly _model: T;

  constructor(model: T) { this._model = model; }

  protected get model(): T { return this._model; }
}
