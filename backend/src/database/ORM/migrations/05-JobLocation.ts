// libraries
/*
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.JobLocation>>(
      migrations.nomeDasTabelas.JobLocations,
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        directoryName: {
          type: DataTypes.STRING,
          field: migrations.nomeDasColunas.directoryName,
          allowNull: false,
        },
        cityId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: { model: migrations.nomeDasTabelas.Cities, key: migrations.nomeDasColunas.idKey },
        },
        departmentId: {
          allowNull: false,
          field: migrations.nomeDasColunas.departmentId,
          type: DataTypes.INTEGER,
          references: {
            model: migrations.nomeDasTabelas.Departments,
            key: migrations.nomeDasColunas.idKey,
          },
        },
      },
    ),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.nomeDasTabelas.JobLocations, {}),
};
*/
