"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const sequelize_1 = require("sequelize");
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
exports.default = {
    up: async (queryInterface) => queryInterface.createTable(exporter_1.migrations.tableName.PcdRanking, {
        position: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, primaryKey: true },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            field: exporter_1.migrations.columnName.userId,
            allowNull: false,
            references: { model: exporter_1.migrations.tableName.Users, key: exporter_1.migrations.columnName.idKey },
        },
    }),
    down: async (queryInterface) => queryInterface
        .dropTable(exporter_1.migrations.tableName.PcdRanking, {}),
};
