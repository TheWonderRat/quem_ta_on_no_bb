// libraries
import { DataTypes, Model, Optional } from 'sequelize';

// types
import { migrationsTypes } from '../../../tipos/exporter';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

type StatusUserCreationAttributes = Optional<migrationsTypes.StatusUser, 'id'>;

export default class StatusUser extends Model<migrationsTypes.StatusUser,
StatusUserCreationAttributes> {
  declare id: number;
  declare statusName: string;
}

StatusUser.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    statusName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: migrations.nomeDasTabelas.StatusUsers, underscored: true, timestamps: false },
);
