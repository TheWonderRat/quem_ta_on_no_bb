// library imports
import { Request, Response, Router } from 'express';

// SSOT
import { pathNames, httpStatus } from '../../SSOT/exporter';

export default class HealthRouter {
  // private properties
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  // getters
  get router(): Router { return this._router; }

  // private methods
  private init(): void {
    this.router.get(pathNames.root, async (__req: Request, res: Response) => res
      .status(httpStatus.HttpStatusOk)
      .send({ message: 'Rota funcionando normalmente' }));
  }
}
