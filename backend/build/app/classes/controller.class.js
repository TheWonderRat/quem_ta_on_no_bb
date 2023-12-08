"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractController {
    constructor(service) { this._service = service; }
    get service() { return this._service; }
}
exports.default = AbstractController;
