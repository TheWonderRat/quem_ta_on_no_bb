// SSOT
import { migrations } from '../../../SSOT/exporter';

// ORM
import sequelize from '../conexao';

export default {
  up: async (): Promise<void> => { sequelize.query(migrations.emComum.uuidQuery); },
};
