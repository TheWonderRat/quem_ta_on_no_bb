"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DIALECT = exports.DB_USER = exports.DB_PASSWORD = exports.DB_NAME = exports.HOST = exports.PORT = void 0;
// SSOT
const exporter_1 = require("../../SSOT/exporter");
exports.PORT = Number(process.env.PORT_DB) || exporter_1.dbConfig.DB_DEFAULT_PORT;
exports.HOST = process.env.HOST || exporter_1.dbConfig.DB_DEFAULT_HOST;
exports.DB_NAME = process.env.DB_NAME || exporter_1.dbConfig.DB_DEFAULT_NAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD || exporter_1.dbConfig.DB_DEFAULT_PASSWORD;
exports.DB_USER = process.env.DB_USER || exporter_1.dbConfig.DB_DEFAULT_USER;
exports.DB_DIALECT = exporter_1.dbConfig.DB_DEFAULT_DIALECT;
