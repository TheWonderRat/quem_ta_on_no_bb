"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const sequelize_1 = require("sequelize");
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
exports.default = {
    up: async (queryInterface) => queryInterface.createTable(exporter_1.migrations.tableName.Users, {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.Sequelize.literal(exporter_1.migrations.common.UUID),
            allowNull: false,
        },
        passwordHash: {
            type: sequelize_1.DataTypes.STRING,
            field: exporter_1.migrations.columnName.passwordHash,
            allowNull: false,
        },
        registry: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        pcd: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
        ppp: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
        backupRegister: {
            type: sequelize_1.DataTypes.BOOLEAN,
            field: exporter_1.migrations.columnName.backupRegister,
            allowNull: false,
            defaultValue: false,
        },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        classId: {
            allowNull: true,
            field: exporter_1.migrations.columnName.classId,
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: exporter_1.migrations.tableName.Classes, key: exporter_1.migrations.columnName.idKey },
        },
        statusId: {
            allowNull: true,
            field: exporter_1.migrations.columnName.statusId,
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: exporter_1.migrations.tableName.StatusUsers, key: exporter_1.migrations.columnName.idKey },
        },
        jobLocationId: {
            allowNull: true,
            field: exporter_1.migrations.columnName.jobLocationId,
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: exporter_1.migrations.tableName.JobLocations, key: exporter_1.migrations.columnName.idKey },
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            field: exporter_1.migrations.columnName.createdAt,
            allowNull: false,
            defaultValue: sequelize_1.Sequelize.literal(exporter_1.migrations.common.currentTimestamp),
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            field: exporter_1.migrations.columnName.updatedAt,
            allowNull: false,
            defaultValue: sequelize_1.Sequelize.literal(exporter_1.migrations.common.currentTimestamp),
        },
    }),
    down: async (queryInterface) => queryInterface
        .dropTable(exporter_1.migrations.tableName.Users, {}),
};
