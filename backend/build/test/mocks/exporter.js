"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.status = exports.users = void 0;
var users_json_1 = require("./users.json");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return __importDefault(users_json_1).default; } });
var status_json_1 = require("./status.json");
Object.defineProperty(exports, "status", { enumerable: true, get: function () { return __importDefault(status_json_1).default; } });
var request_json_1 = require("./request.json");
Object.defineProperty(exports, "request", { enumerable: true, get: function () { return __importDefault(request_json_1).default; } });
