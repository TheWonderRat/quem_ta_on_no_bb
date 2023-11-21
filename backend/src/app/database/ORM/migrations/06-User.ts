// libraries
import { Model, DataTypes, QueryInterface, Sequelize } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.UserMigration>>(migrations.tableName.Users, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal(migrations.common.UUID),
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        field: migrations.columnName.passwordHash,
        allowNull: false,
      },
      registry: { type: DataTypes.INTEGER, allowNull: false },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pcd: { type: DataTypes.BOOLEAN, allowNull: false },
      ppp: { type: DataTypes.BOOLEAN, allowNull: false },
      backupRegister: {
        type: DataTypes.BOOLEAN,
        field: migrations.columnName.backupRegister,
        allowNull: false,
        defaultValue: false,
      },
      email: { type: DataTypes.STRING, allowNull: true },
      classId: {
        allowNull: true,
        field: migrations.columnName.classId,
        type: DataTypes.INTEGER,
        references: { model: migrations.tableName.Classes, key: migrations.columnName.idKey },
      },
      statusId: {
        allowNull: true,
        field: migrations.columnName.statusId,
        type: DataTypes.INTEGER,
        references: { model: migrations.tableName.StatusUsers, key: migrations.columnName.idKey },
      },
      jobLocationId: {
        allowNull: true,
        field: migrations.columnName.jobLocationId,
        type: DataTypes.INTEGER,
        references: { model: migrations.tableName.JobLocations, key: migrations.columnName.idKey },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: migrations.columnName.createdAt,
        allowNull: false,
        defaultValue: Sequelize.literal(migrations.common.currentTimestamp),
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: migrations.columnName.updatedAt,
        allowNull: false,
        defaultValue: Sequelize.literal(migrations.common.currentTimestamp),
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.tableName.Users, {}),
};
