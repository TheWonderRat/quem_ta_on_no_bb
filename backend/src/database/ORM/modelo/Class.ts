// libraries
import { DataTypes, Model } from 'sequelize';

// types
import { migrationsTypes } from '../../../tipos/exporter';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

export default class Class extends Model<migrationsTypes.Class, migrationsTypes.Class> {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Class.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  },
  { sequelize, tableName: migrations.nomeDasTabelas.Classes, underscored: true, timestamps: true },
);
