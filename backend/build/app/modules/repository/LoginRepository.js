"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract Class
const repository_class_1 = __importDefault(require("../../classes/repository.class"));
// model
const exporter_1 = require("../../database/ORM/model/exporter");
class LoginRepository extends repository_class_1.default {
    constructor() { super(exporter_1.User); }
    // public methods
    async findUserByEmail(email) {
        const user = await this.model.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        return { email: user.email, hash: user.passwordHash };
    }
}
exports.default = LoginRepository;
