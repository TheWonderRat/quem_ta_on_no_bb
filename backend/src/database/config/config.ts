// Sequelize
import { Options } from 'sequelize';

// Environment variables
import * as env from './ambiente';

const sequelizeOptions: Options = {
  port: env.PORT,
  host: env.HOST,
  database: env.NOME_DB,
  username: env.USUARIO_DB,
  password: env.SENHA_DB,
  dialect: env.DIALETO_DB,
};

export = sequelizeOptions;
