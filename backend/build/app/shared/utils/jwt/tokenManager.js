"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
// libraries
const authError_1 = __importDefault(require("../error/authError"));
class TokenManager {
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, exporter_1.jwtConfig.JWT_SECRET, exporter_1.jwtConfig.JWT_SIGN_OPTIONS);
    }
    static validateToken(token) {
        try {
            jsonwebtoken_1.default.verify(token, exporter_1.jwtConfig.JWT_SECRET);
        }
        catch (__e) {
            throw new authError_1.default({
                message: exporter_1.errorMessages.USER_NOT_AUTHENTICATED,
                statusCode: exporter_1.httpStatus.UNAUTHORIZED,
            });
        }
    }
}
exports.default = TokenManager;
