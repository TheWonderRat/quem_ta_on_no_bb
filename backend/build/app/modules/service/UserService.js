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
// repository
const exporter_3 = require("../repository/exporter");
class LoginService extends service_class_1.default {
    constructor() {
        super(new exporter_3.UserRepository());
    }
    // public methods
    async createUsers(newUsers) {
        const records = await this.repository.populateUsers(newUsers);
        if (!records) {
            throw new exporter_2.ServerError({
                message: exporter_1.errorMessages.DATABASE_NOT_FOUND,
                statusCode: exporter_1.httpStatus.NOT_FOUND,
            });
        }
        return records;
    }
}
exports.default = LoginService;
