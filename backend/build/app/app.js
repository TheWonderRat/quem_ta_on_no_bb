"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// library imports
const express_1 = __importStar(require("express"));
// routes
const routers = __importStar(require("./routes/exporter"));
// middleware
const exporter_1 = require("./middlewares/exporter");
// SSOT
const exporter_2 = require("./SSOT/exporter");
class App {
    constructor() {
        this._app = (0, express_1.default)();
        this._routerManager = (0, express_1.Router)();
        this.initMids();
        this.initRoutes();
        this.initErrorMid();
    }
    // getters
    get app() { return this._app; }
    get routerManager() { return this._routerManager; }
    // private methods
    initMids() {
        this.app.use(express_1.default.json());
        this.app.use(this.routerManager);
    }
    initRoutes() {
        this.routerManager.use(exporter_2.pathNames.user, new routers.UserRouter().router);
        this.routerManager.use(exporter_2.pathNames.login, new routers.LoginRouter().router);
        this.routerManager.use(exporter_2.pathNames.health, new routers.HealthRouter().router);
    }
    initErrorMid() {
        this.app.use(exporter_1.ErrorMid.errorHandler);
    }
}
exports.default = App;
