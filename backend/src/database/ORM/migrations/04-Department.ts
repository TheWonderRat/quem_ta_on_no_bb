// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.Department>>(
      migrations.tableNames.Departments,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        departmentName: {
          field: migrations.columnName.departmentName,
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
    ),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.tableNames.Departments, {}),
};
