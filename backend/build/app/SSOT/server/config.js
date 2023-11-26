"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT_BACK = exports.HOST_BACK = void 0;
const DEFAULT_BACK_PORT = 3001;
const DEFAULT_BACK_HOST = 'localhost';
exports.HOST_BACK = process.env.HOST_BACK || DEFAULT_BACK_HOST;
exports.PORT_BACK = Number(process.env.PORT_BACK) || DEFAULT_BACK_PORT;
