// libraries
import { DataTypes, ForeignKey, Model } from 'sequelize';

// types
import { migrationsTypes } from '../../../types/exporter';

// SSOT
import { migrations, models } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

// Model
import User from './User';

export default class PcdRanking extends Model<migrationsTypes.Ranking, migrationsTypes.Ranking> {
  declare position: number;
  declare userId: ForeignKey<migrationsTypes.User['inscricao']>;
}

PcdRanking.init(
  {
    position: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: migrations.nomeDasTabelas.PcdRanking, underscored: true, timestamps: false },
);

User.hasOne(PcdRanking, { foreignKey: models.userId });
PcdRanking.belongsTo(User, { foreignKey: models.userId });
