// library
import { Sequelize } from 'sequelize';

// models
//import * as models from '../../database/ORM/model/exporter';
import * as models from '../../database/ORM/modelo/exporter';

export type ModelsTypes = Sequelize
| models.Cidade
| models.Contato
| models.Diretoria
| models.Estado
| models.Lotacao
| models.LotadoEm
| models.Ranking
| models.Situacao
| models.Turma
| models.Aprovado
;

