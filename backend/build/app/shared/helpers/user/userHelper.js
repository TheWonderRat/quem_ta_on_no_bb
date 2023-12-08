"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
const passwordManager_1 = __importDefault(require("../../utils/bcrypt/passwordManager"));
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
class UserHelper {
    static async createHashedPassword(newUsers) {
        const usersWithPassword = newUsers
            .map(async (newUser) => {
            const passwordHash = await passwordManager_1.default.generateHash(`${newUser.registry}${newUser.name}${exporter_1.jwtConfig.JWT_SECRET}`);
            return { ...newUser, passwordHash };
        });
        return Promise.all(usersWithPassword);
    }
}
exports.default = UserHelper;
