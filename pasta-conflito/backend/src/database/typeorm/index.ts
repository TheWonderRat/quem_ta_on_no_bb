// libraries
import { DataSource } from 'typeorm';

// config
import * as config from '../config/config';

const myDataSource = new DataSource({
  type: config.DB_TYPE,
  host: config.HOST,
  port: config.PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  // NAO MUDAR
  entities: [
    './src/modules/**/entity/*.ts',
  ],
  // NAO MUDAR
  migrations: [
    './src/shared/typeorm/migrations/*.ts',
  ],
});

myDataSource.initialize()
  .then(async () => {
    // run migrations with e
    // insert data with e
    // kill database with e await runAfterInit();
    console.log('initialized properly');
  })
  .catch((e) => {
    console.log(`${e}`);
  })
  .finally(async () => {
    console.log('called after database connection');
  });

export default myDataSource;
