// libraries
import { DataTypes, ForeignKey, Model } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

// Model
import User from './User';

export default class PcdRanking extends Model<migrations.Ranking, migrations.Ranking> {
  declare position: number;
  declare userId: ForeignKey<migrations.User['id']>;
}

PcdRanking.init(
  {
    position: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: tableNames.PcdRanking, underscored: true, timestamps: false },
);

User.hasOne(PcdRanking, { foreignKey: 'userId' });
PcdRanking.belongsTo(User, { foreignKey: 'userId' });
