// SSOT
import { dbConfig } from '../../SSOT/exporter';

// Environment variables
export const PORT = Number(process.env.PORT) || dbConfig.DB_DEFAULT_PORT;
export const HOST = process.env.PATH || dbConfig.DB_DEFAULT_HOST;
export const DB_NAME = process.env.DB_NAME || dbConfig.DB_DEFAULT_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD || dbConfig.DB_DEFAULT_PASSWORD;
export const DB_USER = process.env.DB_USER || dbConfig.DB_DEFAULT_USER;
export const DB_TYPE = 'postgres';
