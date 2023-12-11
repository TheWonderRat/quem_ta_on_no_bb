// libraries
import { DataTypes, Model, Optional } from 'sequelize';

// types
import { migrationsTypes } from '../../../types/exporter';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

type CityCreationAttributes = Optional<migrationsTypes.City, 'id'>;

export default class City extends Model<migrationsTypes.City, CityCreationAttributes> {
  declare id: number;
  declare cityName: string;
}

City.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    cityName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: migrations.nomeDasTabelas.Cities, underscored: true, timestamps: false },
);
