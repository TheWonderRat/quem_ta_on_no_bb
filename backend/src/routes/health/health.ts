// library imports
import { Request, Response, Router } from 'express';

// class imports
import AbstractRouter from '../../classes/router.class';

// SSOT
import { httpStatus } from '../../SSOT/exporter';

// Controller
import LoginController from '../../modules/controller/LoginController';

export default class HealthRouter extends AbstractRouter<LoginController> {
  constructor() {
    super(Router(), new LoginController());
    this.initRoutes();
  }

  // private methods
  protected initRoutes(): void {
    this.router.get(
      this.rootPath,
      async (__req: Request, res: Response): Promise<Response> => res
        .status(httpStatus.OK)
        .send({ message: 'Rota funcionando normalmente' }),
    );
  }
}
