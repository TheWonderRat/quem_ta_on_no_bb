// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable<Model<migrations.Ranking>>(tableNames.PcdRanking, {
      position: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: tableNames.Users, key: common.idKey },
      },
    }),
  down: async (queryInterface: QueryInterface): Promise<void> => queryInterface
    .dropTable(tableNames.PcdRanking, {}),
};
