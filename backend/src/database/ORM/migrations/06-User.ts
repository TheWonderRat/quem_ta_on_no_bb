// libraries
import { Model, DataTypes, QueryInterface, Sequelize } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrations.User>>(tableNames.Users, {
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
      classId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: tableNames.Classes, key: common.idKey },
      },
      statusId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: tableNames.StatusUsers, key: common.idKey },
      },
      jobLocationId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: tableNames.JobLocations, key: common.idKey },
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(tableNames.Users, {}),
};
