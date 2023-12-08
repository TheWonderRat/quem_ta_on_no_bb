// library imports
import { Router } from 'express';

// middleware
import { LoginMid } from '../../middlewares/exporter';

// class imports
import AbstractRouter from '../../classes/router.class';

// Controller
import LoginController from '../../modules/controller/LoginController';

export default class LoginRouter extends AbstractRouter<LoginController> {
  constructor() {
    super(Router(), new LoginController());
    this.initRoutes();
  }

  // private methods
  protected initRoutes(): void {
    this.router.post(this.rootPath, LoginMid.validateLoginFields, this.controller.login);
  }
}
