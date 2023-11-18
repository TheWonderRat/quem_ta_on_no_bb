// libraries
import { Model, DataTypes, QueryInterface, Sequelize } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.Class>>(migrations.tableNames.Classes, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        field: migrations.columnName.createdAt,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(migrations.common.currentTimestamp),

      },
      updatedAt: {
        field: migrations.columnName.updatedAt,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(migrations.common.currentTimestamp),
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.tableNames.Classes, {}),
};
