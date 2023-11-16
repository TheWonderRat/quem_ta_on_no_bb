// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, columnName } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface) =>
    queryInterface.createTable<Model<migrations.StatusUser>>(tableNames.StatusUser, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      statusName: {
        field: columnName.statusName,
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
  down: async (queryInterface: QueryInterface) => queryInterface
    .dropTable(tableNames.StatusUser, {}),
};
