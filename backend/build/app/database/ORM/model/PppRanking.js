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
// Model
const User_1 = __importDefault(require("./User"));
class PppRanking extends sequelize_1.Model {
}
exports.default = PppRanking;
PppRanking.init({
    position: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
}, { sequelize: connection_1.default, tableName: exporter_1.migrations.tableName.PppRanking, underscored: true, timestamps: false });
User_1.default.hasOne(PppRanking, { foreignKey: exporter_1.models.userId });
PppRanking.belongsTo(User_1.default, { foreignKey: exporter_1.models.userId });
