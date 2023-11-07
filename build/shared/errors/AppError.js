"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    message;
    statusCode;
    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = AppError;
