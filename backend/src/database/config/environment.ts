// library
import { Dialect } from 'sequelize';

// SSOT
import { dbConfig } from '../../SSOT/exporter';

export const PORT: number = Number(process.env.PORT_DB) || dbConfig.DB_DEFAULT_PORT;
export const HOST: string = process.env.HOST || dbConfig.DB_DEFAULT_HOST;
export const DB_NAME: string = process.env.DB_NAME || dbConfig.DB_DEFAULT_NAME;
export const DB_PASSWORD: string = process.env.DB_PASSWORD || dbConfig.DB_DEFAULT_PASSWORD;
export const DB_USER: string = process.env.DB_USER || dbConfig.DB_DEFAULT_USER;
export const DB_DIALECT: Dialect = dbConfig.DB_DEFAULT_DIALECT;
