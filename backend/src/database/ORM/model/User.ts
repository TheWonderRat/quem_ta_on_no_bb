// libraries
import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';

// types
import { migrations } from '../../../types/exporter';

// SSOT
import { tableNames } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

// Models
import Class from './Class';
import StatusUser from './StatusUser';
import JobLocation from './JobLocation';

type UserCreationAttributes = Optional<migrations.User, 'id'>;

export default class User extends Model<migrations.User, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare cityId: ForeignKey<migrations.City['id']>;
  declare departmentId: ForeignKey<migrations.Department['id']>;
  declare statusUserId: ForeignKey<migrations.StatusUser['id']>;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    pcd: { type: DataTypes.BOOLEAN, allowNull: false },
    ppp: { type: DataTypes.BOOLEAN, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    registry: { type: DataTypes.BOOLEAN, allowNull: false },
    classId: { type: DataTypes.INTEGER, allowNull: false },
    jobLocationId: { type: DataTypes.INTEGER, allowNull: false },
    statusId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: tableNames.Users, underscored: true, timestamps: false },
);

Class.hasMany(User, { foreignKey: 'classId', sourceKey: 'id', as: 'usersClass' });
User.belongsTo(Class, { foreignKey: 'classId', targetKey: 'id', as: 'class' });

StatusUser.hasMany(User, { foreignKey: 'statusId', sourceKey: 'id', as: 'usersStatus' });
User.belongsTo(StatusUser, { foreignKey: 'statusId', targetKey: 'id', as: 'status' });

JobLocation.hasMany(User, { foreignKey: 'jobLocationId', sourceKey: 'id', as: 'usersJobLocation' });
User.belongsTo(JobLocation, { foreignKey: 'jobLocationId', targetKey: 'id', as: 'jobLocation' });
