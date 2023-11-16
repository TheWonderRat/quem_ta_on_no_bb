// libraries
import { DataTypes, Model, Optional } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

type CityCreationAttributes = Optional<migrations.City, 'id'>;

export default class City extends Model<migrations.City, CityCreationAttributes> {
  declare id: number;
  declare cityName: string;
}

City.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    cityName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: tableNames.Cities, underscored: true, timestamps: false },
);
