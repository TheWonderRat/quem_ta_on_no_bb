// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// types
import { migrationsTypes } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrationsTypes.Ranking>>(migrations.tableNames.PcdRanking, {
      position: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      userId: {
        type: DataTypes.UUID,
        field: migrations.columnName.userId,
        allowNull: false,
        references: { model: migrations.tableNames.Users, key: migrations.columnName.idKey },
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(migrations.tableNames.PcdRanking, {}),
};
