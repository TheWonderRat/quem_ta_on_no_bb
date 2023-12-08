// SSOT
import { migrations } from '../../../SSOT/exporter';

// ORM
import sequelize from '../connection';

export default {
  up: async (): Promise<void> => { sequelize.query(migrations.common.uuidQuery); },
};
