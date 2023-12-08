// Classes
import AbstractService from '../../classes/service.class';
import LoginService from '../../modules/service/LoginService';

// Repositories
import { RepositoryTypes } from '../repositories/repositoryTypes';

export type ServiceTypes = LoginService | AbstractService<RepositoryTypes>;
