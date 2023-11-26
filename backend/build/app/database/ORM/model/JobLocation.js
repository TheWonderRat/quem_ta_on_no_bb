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
// models
const City_1 = __importDefault(require("./City"));
const Department_1 = __importDefault(require("./Department"));
class JobLocation extends sequelize_1.Model {
}
exports.default = JobLocation;
JobLocation.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    directoryName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    cityId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    departmentId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: connection_1.default,
    tableName: exporter_1.migrations.tableName.JobLocations,
    underscored: true,
    timestamps: false,
});
City_1.default.hasMany(JobLocation, {
    foreignKey: exporter_1.models.cityId,
    sourceKey: exporter_1.models.id,
    as: exporter_1.models.jobLocationsCity,
});
JobLocation.belongsTo(City_1.default, { foreignKey: exporter_1.models.cityId, targetKey: exporter_1.models.id, as: exporter_1.models.city });
Department_1.default.hasMany(JobLocation, { foreignKey: exporter_1.models.departmentId, sourceKey: exporter_1.models.id, as: exporter_1.models.jobLocationsDepartment });
JobLocation.belongsTo(Department_1.default, { foreignKey: exporter_1.models.departmentId, targetKey: exporter_1.models.id, as: exporter_1.models.department });
