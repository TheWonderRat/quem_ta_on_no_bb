// libraries
import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';

// types
import { migrationsTypes } from '../../../tipos/exporter';

// SSOT
import { migrations, models } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

// Models
import Class from './Class';
import StatusUser from './StatusUser';
import JobLocation from './JobLocation';

type UserCreationAttributes = Optional<migrationsTypes.User, 'inscricao'>;

export default class User extends Model<migrationsTypes.User, UserCreationAttributes> {
  declare inscricao: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare cityId: ForeignKey<migrationsTypes.City['id']>;
  declare departmentId: ForeignKey<migrationsTypes.Department['id']>;
  declare statusUserId: ForeignKey<migrationsTypes.StatusUser['id']>;
}

User.init(
  {
    inscricao: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    /*
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    registry: { type: DataTypes.BOOLEAN, allowNull: false },
    classId: { type: DataTypes.INTEGER, allowNull: false },
    jobLocationId: { type: DataTypes.INTEGER, allowNull: false },
    statusId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  */
  },
  { sequelize, tableName: migrations.nomeDasTabelas.Users, underscored: true, timestamps: true },
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
