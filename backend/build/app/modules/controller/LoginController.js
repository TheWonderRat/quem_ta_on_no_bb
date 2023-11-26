"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract controller
const controller_class_1 = __importDefault(require("../../classes/controller.class"));
// SSOT
const exporter_1 = require("../../SSOT/exporter");
// service
const exporter_2 = require("../service/exporter");
class LoginController extends controller_class_1.default {
    constructor() {
        super(new exporter_2.LoginService());
        this.login = this.login.bind(this);
    }
    // public methods
    async login(request, response, next) {
        try {
            const { email, password } = request.body;
            const token = await this.service.validateUser(email, password);
            return response.status(exporter_1.httpStatus.OK).send(token);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = LoginController;
