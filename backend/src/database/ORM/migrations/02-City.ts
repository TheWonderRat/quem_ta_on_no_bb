// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, columnName } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface) =>
    queryInterface.createTable<Model<migrations.City>>(tableNames.City, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cityName: {
        field: columnName.cityName,
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable(tableNames.City, {}),
};
