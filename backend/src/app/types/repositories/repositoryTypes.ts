// Classes
import LoginRepository from '../../modules/repository/LoginRepository';
import AbstractRepository from '../../classes/repository.class';

// Models
import * as models from '../../database/ORM/model/exporter';

export type RepositoryTypes = LoginRepository | AbstractRepository<typeof models>;
