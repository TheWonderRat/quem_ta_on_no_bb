"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../SSOT/exporter");
class AbstractRouter {
    constructor(router, controller) {
        this._rootPath = exporter_1.pathNames.root;
        this._router = router;
        this._controller = controller;
    }
    get router() { return this._router; }
    get rootPath() { return this._rootPath; }
    get controller() { return this._controller; }
}
exports.default = AbstractRouter;
