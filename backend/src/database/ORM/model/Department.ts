// libraries
import { DataTypes, Model, Optional } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

type DepartmentCreationAttributes = Optional<migrations.Department, 'id'>;

export default class Department extends Model<migrations.Department, DepartmentCreationAttributes> {
  declare id: number;
  declare departmentName: string;
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    departmentName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: tableNames.Departments, underscored: true, timestamps: false },
);
