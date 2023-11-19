// Classes
import LoginController from '../../modules/controller/LoginController';
import AbstractController from '../../classes/controller.class';

// Services
import { ServiceTypes } from '../services/serviceTypes';

export type ControllerTypes = LoginController | AbstractController<ServiceTypes>;
