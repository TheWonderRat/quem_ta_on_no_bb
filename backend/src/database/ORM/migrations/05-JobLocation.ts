// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrations.JobLocation>>(tableNames.JobLocations, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      directoryName: { type: DataTypes.STRING, allowNull: false },
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: tableNames.Cities, key: common.idKey },
      },
      departmentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: tableNames.Departments, key: common.idKey },
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(tableNames.JobLocations, {}),
};
