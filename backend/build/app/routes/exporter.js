"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = exports.HealthRouter = exports.UserRouter = void 0;
var user_1 = require("./user/user");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var health_1 = require("./health/health");
Object.defineProperty(exports, "HealthRouter", { enumerable: true, get: function () { return __importDefault(health_1).default; } });
var login_1 = require("./login/login");
Object.defineProperty(exports, "LoginRouter", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
