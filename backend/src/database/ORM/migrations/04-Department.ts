// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, columnName } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrations.Department>>(tableNames.Departments, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      departmentName: {
        field: columnName.departmentName,
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(tableNames.Departments, {}),
};
