"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library imports
const express_1 = require("express");
// middleware
const exporter_1 = require("../../middlewares/exporter");
// class imports
const router_class_1 = __importDefault(require("../../classes/router.class"));
// Controller
const LoginController_1 = __importDefault(require("../../modules/controller/LoginController"));
class LoginRouter extends router_class_1.default {
    constructor() {
        super((0, express_1.Router)(), new LoginController_1.default());
        this.initRoutes();
    }
    // private methods
    initRoutes() {
        this.router.post(this.rootPath, exporter_1.LoginMid.validateLoginFields, this.controller.login);
    }
}
exports.default = LoginRouter;
