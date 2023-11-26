"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const sequelize = new sequelize_1.Sequelize(config_1.default);
// async function tryConnection(): Promise<void> {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     sequelize.close();
//   } catch (error) {
//     const { message }: { message: string } = error as { message: string };
//     console.error('Unable to connect to the database:', message);
//   }
// }
// tryConnection();
exports.default = sequelize;
