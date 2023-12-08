"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract Controller
const controller_class_1 = __importDefault(require("../../classes/controller.class"));
// SSOT
const exporter_1 = require("../../SSOT/exporter");
// Helpers
const exporter_2 = require("../../shared/helpers/exporter");
// Service
const exporter_3 = require("../service/exporter");
class AprovadoController extends controller_class_1.default {
    constructor() {
        super(new exporter_3.UserService());
        this.registerUsers = this.registerUsers.bind(this);
    }
    async registerUsers(req, res, next) {
        try {
            const usersWithHash = await exporter_2.UserHelper
                .createHashedPassword(req.body);
            const newUsers = await this.service.createUsers(usersWithHash);
            return res.status(exporter_1.httpStatus.CREATED).send(newUsers);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = AprovadoController;
