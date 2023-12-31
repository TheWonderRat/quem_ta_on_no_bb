// libraries
import { DataTypes, ForeignKey, Model } from 'sequelize';

// types
import { migrationsTypes } from '../../../types/exporter';

// SSOT
import { migrations, models } from '../../../SSOT/exporter';

// ORM
import sequelize from '../connection';

// Model
import User from './User';

export default class PcdRanking extends Model<migrationsTypes.Ranking, migrationsTypes.Ranking> {
  declare position: number;
  declare userId: ForeignKey<migrationsTypes.User['id']>;
}

PcdRanking.init(
  {
    position: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, tableName: migrations.tableName.PcdRanking, underscored: true, timestamps: false },
);

User.hasOne(PcdRanking, { foreignKey: models.userId });
PcdRanking.belongsTo(User, { foreignKey: models.userId });
