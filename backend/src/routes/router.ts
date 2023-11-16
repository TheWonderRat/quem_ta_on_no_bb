// library imports
import { Router } from 'express';

// SSOT
import { pathNames } from '../SSOT/exporter';

export default class RouterManager {
  // private properties
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  // getters
  public get router(): Router { return this._router; }

  // public methods
  public init(): void {
    this.router.use(pathNames.health, )
    // this.router.use('/listar', listarRouter);
    // this.router.use('/usuario', userRouter);
  }
}

// import userRouter from './aprovado.routes';
// import listarRouter from './lista.routes';

// const router = Router();

// router.use('/listar', listarRouter);
// router.use('/usuario', userRouter);

// export default router;
