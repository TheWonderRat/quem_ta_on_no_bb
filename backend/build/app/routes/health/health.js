"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library imports
const express_1 = require("express");
// class imports
const router_class_1 = __importDefault(require("../../classes/router.class"));
// SSOT
const exporter_1 = require("../../SSOT/exporter");
// Controller
const LoginController_1 = __importDefault(require("../../modules/controller/LoginController"));
class HealthRouter extends router_class_1.default {
    constructor() {
        super((0, express_1.Router)(), new LoginController_1.default());
        this.initRoutes();
    }
    // private methods
    initRoutes() {
        this.router.get(this.rootPath, async (__req, res) => res
            .status(exporter_1.httpStatus.OK)
            .send({ message: 'Rota funcionando normalmente' }));
    }
}
exports.default = HealthRouter;
