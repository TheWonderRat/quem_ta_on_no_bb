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
// Models
const Class_1 = __importDefault(require("./Class"));
const StatusUser_1 = __importDefault(require("./StatusUser"));
const JobLocation_1 = __importDefault(require("./JobLocation"));
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: { primaryKey: true, type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    pcd: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    ppp: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    registry: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    passwordHash: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    backupRegister: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    classId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    statusId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    jobLocationId: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
}, { sequelize: connection_1.default, tableName: exporter_1.migrations.tableName.Users, underscored: true, timestamps: true });
Class_1.default.hasMany(User, { foreignKey: exporter_1.models.classId, sourceKey: exporter_1.models.id, as: exporter_1.models.usersClass });
User.belongsTo(Class_1.default, { foreignKey: exporter_1.models.classId, targetKey: exporter_1.models.id, as: exporter_1.models.className });
StatusUser_1.default.hasMany(User, {
    foreignKey: exporter_1.models.statusId,
    sourceKey: exporter_1.models.id,
    as: exporter_1.models.usersStatus,
});
User.belongsTo(StatusUser_1.default, {
    foreignKey: exporter_1.models.statusId,
    targetKey: exporter_1.models.id,
    as: exporter_1.models.status,
});
JobLocation_1.default.hasMany(User, {
    foreignKey: exporter_1.models.jobLocationId,
    sourceKey: exporter_1.models.id,
    as: exporter_1.models.usersJobLocation,
});
User.belongsTo(JobLocation_1.default, {
    foreignKey: exporter_1.models.jobLocationId,
    targetKey: exporter_1.models.id,
    as: exporter_1.models.jobLocation,
});
