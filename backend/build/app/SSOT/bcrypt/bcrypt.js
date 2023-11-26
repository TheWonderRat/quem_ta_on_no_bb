"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_SALT_ROUNDS = exports.DEFAULT_SALT_ROUNDS = void 0;
exports.DEFAULT_SALT_ROUNDS = 10;
exports.BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
    || exports.DEFAULT_SALT_ROUNDS;
