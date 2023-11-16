// libraries
import { DataTypes, Model, Optional } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

type StatusUserCreationAttributes = Optional<migrations.StatusUser, 'id'>;

export default class StatusUser extends Model<migrations.StatusUser, StatusUserCreationAttributes> {
  declare id: number;
  declare statusName: string;
}

StatusUser.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    statusName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: tableNames.StatusUsers, underscored: true, timestamps: false },
);
