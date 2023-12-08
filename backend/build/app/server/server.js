"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// App
const app_1 = __importDefault(require("../app"));
// SSOT
const exporter_1 = require("../SSOT/exporter");
class Server {
    constructor() {
        this._app = new app_1.default().app;
        this._port = exporter_1.serverConfig.PORT_BACK;
    }
    // getters
    get app() { return this._app; }
    get port() { return this._port; }
    // public methods
    start() {
        this.app.listen(this.port, () => console.log(`server started on ${exporter_1.serverConfig.HOST_BACK}:${this.port}`));
    }
}
new Server().start();
