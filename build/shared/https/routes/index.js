"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const user_routes_1 = __importDefault(require("./User/routes/user.routes"));
const user_routes_1 = __importDefault(require("../../../modules/User/routes/user.routes"));
const router = (0, express_1.Router)();
router.use('/usuario', user_routes_1.default);
//router.use('/file',filesRouter);
//router.use('/session',sessionRouter);
//router.use('/folder',folderRouter);
router.use('/anorther-dummy-route-to-prevent-express-shitty-error/not to be EVER found', (request, response) => {
    return response.status(500).json({ status: "forbidden", message: "what the thell, get out!!" });
});
exports.default = router;
