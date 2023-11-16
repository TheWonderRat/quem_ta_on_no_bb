// SSOT
import { common } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

export default {
  up: async (): Promise<void> => { sequelize.query(common.uuidQuery); },
};
