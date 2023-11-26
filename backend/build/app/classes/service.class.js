"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractService {
    constructor(repository) { this._repository = repository; }
    get repository() { return this._repository; }
}
exports.default = AbstractService;
