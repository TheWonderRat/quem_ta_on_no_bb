// SSOT
import { common } from '../../../SSOT/migrations/exporter';

// ORM
import sequelize from '../connection';

export default {
  up: async () => sequelize.query(common.uuidQuery),
};
