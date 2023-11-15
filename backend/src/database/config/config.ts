// SSOT
import { dbConfig } from '../../SSOT/exporter';

export const PORT = Number(process.env.PORT_DB) || dbConfig.DB_DEFAULT_PORT;
export const HOST = process.env.HOST || dbConfig.DB_DEFAULT_HOST;
export const DB_NAME = process.env.DB_NAME || dbConfig.DB_DEFAULT_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD || dbConfig.DB_DEFAULT_PASSWORD;
export const DB_USER = process.env.DB_USER || dbConfig.DB_DEFAULT_USER;
export const DB_TYPE = 'postgres';
