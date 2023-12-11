// libraries
import { Model, DataTypes, QueryInterface, Sequelize } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../tipos/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.Class>>(migrations.nomeDasTabelas.Classes, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        field: migrations.nomeDasColunas.createdAt,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(migrations.emComum.currentTimestamp),

      },
      updatedAt: {
        field: migrations.nomeDasColunas.updatedAt,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(migrations.emComum.currentTimestamp),
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.nomeDasTabelas.Classes, {}),
};
