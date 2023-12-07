"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const sequelize_1 = require("sequelize");
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
exports.default = {
    up: async (queryInterface) => queryInterface.createTable(exporter_1.migrations.tableName.Cities, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        cityName: {
            field: exporter_1.migrations.columnName.cityName,
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }),
    down: async (queryInterface) => queryInterface
        .dropTable(exporter_1.migrations.tableName.Cities, {}),
};