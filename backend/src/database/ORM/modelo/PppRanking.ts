// libraries
import { DataTypes, ForeignKey, Model } from 'sequelize';

// types
import { migrationsTypes } from '../../../tipos/exporter';

// SSOT
import { migrations, models } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

// Model
import User from './User';

export default class PppRanking extends Model<migrationsTypes.Ranking, migrationsTypes.Ranking> {
  declare position: number;
  declare userId: ForeignKey<migrationsTypes.User['inscricao']>;
}

PppRanking.init(
  {
    position: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: migrations.nomeDasTabelas.PppRanking, underscored: true, timestamps: false },
);

User.hasOne(PppRanking, { foreignKey: models.userId });
PppRanking.belongsTo(User, { foreignKey: models.userId });
