// libraries
import { DataTypes, Model } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

export default class Class extends Model<migrations.Class, migrations.Class> {
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
  { sequelize, tableName: tableNames.Classes, underscored: true, timestamps: true },
);
