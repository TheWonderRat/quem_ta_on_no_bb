// libraries
import { Model, DataTypes, QueryInterface, Sequelize } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrations.Class>>(tableNames.Classes, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        field: common.createdAt,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(common.currentTimestamp),

      },
      updatedAt: {
        field: common.updatedAt,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(common.currentTimestamp),
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(tableNames.Classes, {}),
};
