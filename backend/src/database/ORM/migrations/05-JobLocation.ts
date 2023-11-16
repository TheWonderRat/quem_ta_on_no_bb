// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface) =>
    queryInterface.createTable<Model<migrations.JobLocation>>(tableNames.JobLocation, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      city: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: tableNames.City, key: common.idKey },
      },
      department: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: tableNames.Department, key: common.idKey },
      },
      directoryName: { type: DataTypes.STRING, allowNull: false },
    }),
  down: async (queryInterface: QueryInterface) => queryInterface
    .dropTable(tableNames.JobLocation, {}),
};
