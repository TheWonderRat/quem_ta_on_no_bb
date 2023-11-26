"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestError extends Error {
    constructor(erroInfo) {
        super(erroInfo.message);
        this._errorInfo = erroInfo;
    }
    get errorInfo() { return this._errorInfo; }
}
exports.default = RequestError;
