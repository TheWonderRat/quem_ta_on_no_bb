// libraries
import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

// models
import City from './City';
import Department from './Department';

type JobLocationCreationAttributes = Optional<migrations.JobLocation, 'id'>;

export default class JobLocation extends Model<
migrations.JobLocation,
JobLocationCreationAttributes
> {
  declare id: number;
  declare directoryName: string;
  declare cityId: ForeignKey<migrations.City['id']>;
  declare departmentId: ForeignKey<migrations.Department['id']>;
}

JobLocation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    directoryName: { type: DataTypes.STRING, allowNull: false },
    cityId: { type: DataTypes.INTEGER, allowNull: false },
    departmentId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: tableNames.JobLocations, underscored: true, timestamps: false },
);

City.hasMany(JobLocation, { foreignKey: 'cityId', sourceKey: 'id', as: 'jobLocationsCity' });
JobLocation.belongsTo(City, { foreignKey: 'cityId', targetKey: 'id', as: 'city' });

Department.hasMany(
  JobLocation,
  { foreignKey: 'departmentId', sourceKey: 'id', as: 'jobLocationsDepartment' },
);
JobLocation.belongsTo(
  Department,
  { foreignKey: 'departmentId', targetKey: 'id', as: 'department' },
);
