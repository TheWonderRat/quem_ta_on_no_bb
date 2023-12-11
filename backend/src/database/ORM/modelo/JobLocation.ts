// libraries
import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';

// types
import { migrationsTypes } from '../../../tipos/exporter';

// SSOT
import { migrations, models } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

// models
import City from './City';
import Department from './Department';

type JobLocationCreationAttributes = Optional<migrationsTypes.JobLocation, 'id'>;

export default class JobLocation extends Model<
migrationsTypes.JobLocation,
JobLocationCreationAttributes
> {
  declare id: number;
  declare directoryName: string;
  declare cityId: ForeignKey<migrationsTypes.City['id']>;
  declare departmentId: ForeignKey<migrationsTypes.Department['id']>;
}

JobLocation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    directoryName: { type: DataTypes.STRING, allowNull: false },
    cityId: { type: DataTypes.INTEGER, allowNull: false },
    departmentId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: migrations.nomeDasTabelas.JobLocations,
    underscored: true,
    timestamps: false,
  },
);

City.hasMany(JobLocation, {
  foreignKey: models.cityId,
  sourceKey: models.id,
  as: models.jobLocationsCity,
});
JobLocation.belongsTo(City, { foreignKey: models.cityId, targetKey: models.id, as: models.city });

Department.hasMany(
  JobLocation,
  { foreignKey: models.departmentId, sourceKey: models.id, as: models.jobLocationsDepartment },
);
JobLocation.belongsTo(
  Department,
  { foreignKey: models.departmentId, targetKey: models.id, as: models.department },
);
