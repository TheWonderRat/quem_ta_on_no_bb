"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = exports.AbstractController = exports.AbstractService = exports.AbstractRouter = void 0;
var router_class_1 = require("./router.class");
Object.defineProperty(exports, "AbstractRouter", { enumerable: true, get: function () { return __importDefault(router_class_1).default; } });
var service_class_1 = require("./service.class");
Object.defineProperty(exports, "AbstractService", { enumerable: true, get: function () { return __importDefault(service_class_1).default; } });
var controller_class_1 = require("./controller.class");
Object.defineProperty(exports, "AbstractController", { enumerable: true, get: function () { return __importDefault(controller_class_1).default; } });
var repository_class_1 = require("./repository.class");
Object.defineProperty(exports, "AbstractRepository", { enumerable: true, get: function () { return __importDefault(repository_class_1).default; } });
