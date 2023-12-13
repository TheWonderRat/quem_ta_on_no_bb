// Classes
import { LoginRepository, UserRepository } from '../../modules/repository/exporter';
import AbstractRepository from '../../classes/repository.class';

// Models
import * as models from '../../database/ORM/model/exporter';

export type RepositoryTypes = AbstractRepository<typeof models>
| LoginRepository
| UserRepository;
