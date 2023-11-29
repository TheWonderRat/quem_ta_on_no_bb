"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library for hashing and comparing passwords
const bcrypt_1 = __importDefault(require("bcrypt"));
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
class PasswordManager {
    static generateHash(password) {
        return bcrypt_1.default.hash(password, exporter_1.bcryptConfig.BCRYPT_SALT_ROUNDS);
    }
    static async comparePassword(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
}
exports.default = PasswordManager;
