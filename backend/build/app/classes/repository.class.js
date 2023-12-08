"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractRepository {
    constructor(model) { this._model = model; }
    get model() { return this._model; }
}
exports.default = AbstractRepository;
