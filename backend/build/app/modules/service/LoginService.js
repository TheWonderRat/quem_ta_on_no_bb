"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract service
const service_class_1 = __importDefault(require("../../classes/service.class"));
// SSOT
const exporter_1 = require("../../SSOT/exporter");
// utils
const exporter_2 = require("../../shared/utils/exporter");
// Error constructor
const authError_1 = __importDefault(require("../../shared/utils/error/authError"));
// repository
const exporter_3 = require("../repository/exporter");
class LoginService extends service_class_1.default {
    constructor() {
        super(new exporter_3.LoginRepository());
    }
    // public methods
    async validateUser(email, password) {
        const user = await this.repository.findUserByEmail(email);
        if (!user) {
            throw new authError_1.default({
                message: exporter_1.errorMessages.USER_NOT_FOUND,
                statusCode: exporter_1.httpStatus.NOT_FOUND,
            });
        }
        if (!(await exporter_2.PasswordManager.comparePassword(password, user.hash))) {
            throw new authError_1.default({
                message: exporter_1.errorMessages.MISS_MATCHED_PASSWORD,
                statusCode: exporter_1.httpStatus.UNAUTHORIZED,
            });
        }
        return { token: exporter_2.TokenManager.generateToken({ email: user.email, password: user.hash }) };
    }
}
exports.default = LoginService;
