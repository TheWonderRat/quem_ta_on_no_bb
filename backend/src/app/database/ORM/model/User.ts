// libraries
import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';

// types
import { migrationsTypes } from '../../../types/exporter';

// SSOT
import { migrations, models } from '../../../SSOT/exporter';

// ORM
import sequelize from '../connection';

// Models
import Class from './Class';
import StatusUser from './StatusUser';
import JobLocation from './JobLocation';

type UserCreationAttributes = Optional<migrationsTypes.User, 'id'>;

export default class User extends Model<migrationsTypes.User, UserCreationAttributes> {
  declare id: string;
  declare pcd: boolean;
  declare ppp: boolean;
  declare name: string;
  declare email: string;
  declare registry: number;
  declare passwordHash: string;
  declare classId: ForeignKey<migrationsTypes.City['id']>;
  declare statusId: ForeignKey<migrationsTypes.StatusUser['id']>;
  declare jobLocationId: ForeignKey<migrationsTypes.Department['id']>;
}

User.init(
  {
    id: { primaryKey: true, type: DataTypes.UUIDV4, defaultValue: DataTypes.UUIDV4 },
    pcd: { type: DataTypes.BOOLEAN, allowNull: false },
    ppp: { type: DataTypes.BOOLEAN, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    registry: { type: DataTypes.INTEGER, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    classId: { type: DataTypes.INTEGER, allowNull: true },
    statusId: { type: DataTypes.INTEGER, allowNull: true },
    jobLocationId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, tableName: migrations.tableName.Users, underscored: true, timestamps: true },
);

Class.hasMany(User, { foreignKey: models.classId, sourceKey: models.id, as: models.usersClass });
User.belongsTo(Class, { foreignKey: models.classId, targetKey: models.id, as: models.className });

StatusUser.hasMany(User, {
  foreignKey: models.statusId,
  sourceKey: models.id,
  as: models.usersStatus,
});
User.belongsTo(StatusUser, {
  foreignKey: models.statusId,
  targetKey: models.id,
  as: models.status,
});

JobLocation.hasMany(User, {
  foreignKey: models.jobLocationId,
  sourceKey: models.id,
  as: models.usersJobLocation,
});
User.belongsTo(JobLocation, {
  foreignKey: models.jobLocationId,
  targetKey: models.id,
  as: models.jobLocation,
});
