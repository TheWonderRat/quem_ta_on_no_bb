// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.JobLocation>>(
      migrations.tableName.JobLocations,
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        directoryName: {
          type: DataTypes.STRING,
          field: migrations.columnName.directoryName,
          allowNull: false,
        },
        cityId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: { model: migrations.tableName.Cities, key: migrations.columnName.idKey },
        },
        departmentId: {
          allowNull: false,
          field: migrations.columnName.departmentId,
          type: DataTypes.INTEGER,
          references: {
            model: migrations.tableName.Departments,
            key: migrations.columnName.idKey,
          },
        },
      },
    ),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.tableName.JobLocations, {}),
};
