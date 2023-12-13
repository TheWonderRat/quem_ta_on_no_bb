// library
import { Dialect } from 'sequelize';

// SSOT
import { dbConfig } from '../../SSOT/exporter';

export const PORT: number = Number(process.env.PORT_DB) || dbConfig.DB_DEFAULT_PORT;
export const HOST_DB: string = process.env.HOST_DB || dbConfig.DB_DEFAULT_HOST;
export const HOST_BACK: string = process.env.HOST_BACK || dbConfig.DB_DEFAULT_HOST;
export const DB_USER: string = process.env.POSTGRES_USER || dbConfig.DB_DEFAULT_USER;
export const DB_NAME: string = process.env.POSTGRES_DB || dbConfig.DB_DEFAULT_NAME;
export const DB_DIALECT: Dialect = dbConfig.DB_DEFAULT_DIALECT;
export const DB_PASSWORD: string = process.env.POSTGRES_PASSWORD || dbConfig.DB_DEFAULT_PASSWORD;
