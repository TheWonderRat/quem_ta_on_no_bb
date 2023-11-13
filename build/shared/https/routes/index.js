"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aprovado_routes_1 = __importDefault(require("@modules/Aprovado/routes/aprovado.routes"));
const lista_routes_1 = __importDefault(require("@modules/Lista/routes/lista.routes"));
const router = (0, express_1.Router)();
router.use('/listar', lista_routes_1.default);
router.use('/usuario', aprovado_routes_1.default);
exports.default = router;
