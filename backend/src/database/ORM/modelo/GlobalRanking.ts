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

export default class GlobalRanking extends Model<migrationsTypes.Ranking, migrationsTypes.Ranking> {
  declare position: number;
  declare userId: ForeignKey<migrationsTypes.User['inscricao']>;
}

GlobalRanking.init(
  {
    position: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: migrations.nomeDasTabelas.GlobalRanking,
    underscored: true,
    timestamps: false,
  },
);

User.hasOne(GlobalRanking, { foreignKey: models.userId });
GlobalRanking.belongsTo(User, { foreignKey: models.userId });
