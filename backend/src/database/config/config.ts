// Sequelize
import { Options } from 'sequelize';

// Environment variables
import * as env from './environment';

const sequelizeOptions: Options = {
  port: env.PORT,
  host: env.HOST,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT,
};

export = sequelizeOptions;
