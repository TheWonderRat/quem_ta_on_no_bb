// libraries
import { Model, DataTypes, QueryInterface, Sequelize } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface) =>
    queryInterface.createTable<Model<migrations.User>>(tableNames.User, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal(common.UUID),
        allowNull: false,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      registry: { type: DataTypes.INTEGER, allowNull: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pcd: { type: DataTypes.BOOLEAN, allowNull: false },
      ppp: { type: DataTypes.BOOLEAN, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      class: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: tableNames.Class, key: common.idKey },
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: tableNames.StatusUser, key: common.idKey },
      },
      jobLocation: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: tableNames.JobLocation, key: common.idKey },
      },
    }),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable(tableNames.User, {}),
};
