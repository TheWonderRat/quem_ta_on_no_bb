import { Sequelize } from 'sequelize';

import sequelizeOptions from '../config/config';

const sequelize: Sequelize = new Sequelize(sequelizeOptions);

async function conectarComODB(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    const { message }: { message: string } = error as { message: string };
    console.error('Unable to connect to the database:', message);
  }
}

conectarComODB();

export default sequelize;
