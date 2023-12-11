// libraries
import { DataTypes, Model, Optional } from 'sequelize';

// types
import { migrationsTypes } from '../../../types/exporter';

// SSOT
import { migrations } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

type DepartmentCreationAttributes = Optional<migrationsTypes.Department, 'id'>;

export default class Department extends Model<migrationsTypes.Department,
DepartmentCreationAttributes> {
  declare id: number;
  declare departmentName: string;
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    departmentName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: migrations.nomeDasTabelas.Departments, underscored: true, timestamps: false },
);
