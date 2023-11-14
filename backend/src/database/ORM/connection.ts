// libareis
import { DataSource } from 'typeorm';

// Config
import * as config from '../config/config';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: config.HOST,
  port: config.PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  // // NAO MUDAR
  // entities: [
  //   './src/modules/**/entity/*.ts',
  // ],
  // // NAO MUDAR
  // migrations: [
  //   './src/shared/typeorm/migrations/*.ts',
  // ],
  migrations: ['Turma1699878656685'],
});

PostgresDataSource.initialize()
  .then(() => {
    // run migrations with e
    // insert data with e
    // kill database with e await runAfterInit();
    console.log('initialized properly');
  })
  .catch((e) => {
    console.log(`${e}`);
  })
  .finally(() => {
    console.log('called after database connection');
  });

export default PostgresDataSource;
