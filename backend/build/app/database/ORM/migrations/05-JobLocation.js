"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const sequelize_1 = require("sequelize");
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
exports.default = {
    up: async (queryInterface) => queryInterface.createTable(exporter_1.migrations.tableName.JobLocations, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        directoryName: {
            type: sequelize_1.DataTypes.STRING,
            field: exporter_1.migrations.columnName.directoryName,
            allowNull: false,
        },
        cityId: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            field: exporter_1.migrations.columnName.cityId,
            references: { model: exporter_1.migrations.tableName.Cities, key: exporter_1.migrations.columnName.idKey },
        },
        departmentId: {
            allowNull: false,
            field: exporter_1.migrations.columnName.departmentId,
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: exporter_1.migrations.tableName.Departments,
                key: exporter_1.migrations.columnName.idKey,
            },
        },
    }),
    down: async (queryInterface) => queryInterface
        .dropTable(exporter_1.migrations.tableName.JobLocations, {}),
};
