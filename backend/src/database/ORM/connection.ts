import { Sequelize } from 'sequelize';

import sequelizeOptions from '../config/config';

const sequelize: Sequelize = new Sequelize(sequelizeOptions);

async function tryConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    const { message } = error as { message: string };
    console.error('Unable to connect to the database:', message);
  }
}

tryConnection();

export default sequelize;
