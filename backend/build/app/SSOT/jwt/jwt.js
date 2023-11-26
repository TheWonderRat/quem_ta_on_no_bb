"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SIGN_OPTIONS = exports.JWT_ALGORITHM = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
// Environment variables
exports.JWT_SECRET = process.env.JWT_SECRET || 'default';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRATION || '1d';
exports.JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
exports.JWT_SIGN_OPTIONS = {
    algorithm: exports.JWT_ALGORITHM,
    expiresIn: exports.JWT_EXPIRES_IN,
};
