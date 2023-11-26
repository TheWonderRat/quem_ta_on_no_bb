"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const sequelize_1 = require("sequelize");
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
// ORM
const connection_1 = __importDefault(require("../connection"));
class Department extends sequelize_1.Model {
}
exports.default = Department;
Department.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    departmentName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, { sequelize: connection_1.default, tableName: exporter_1.migrations.tableName.Departments, underscored: true, timestamps: false });
