// libraries
import { Model, DataTypes, QueryInterface } from 'sequelize';

// SSOT
import { tableNames, common } from '../../../SSOT/migrations/exporter';

// types
import { migrations } from '../../../types/exporter';

export default {
  up: async (queryInterface: QueryInterface) =>
    queryInterface.createTable<Model<migrations.Ranking>>(tableNames.PppRanking, {
      position: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: tableNames.User, key: common.idKey },
      },
    }),
  down: async (queryInterface: QueryInterface) => queryInterface
    .dropTable(tableNames.PppRanking, {}),
};
