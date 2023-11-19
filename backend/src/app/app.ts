// library imports
import express, { Express, Router } from 'express';

// routes
import * as routers from './routes/exporter';

// middleware
import { ErrorMid } from './middlewares/exporter';

// SSOT
import { pathNames } from './SSOT/exporter';

export default class App {
  // private properties
  private readonly _app: Express;
  private readonly _routerManager: Router;

  constructor() {
    this._app = express();
    this._routerManager = Router();
    this.initMids();
    this.initRoutes();
    this.initErrorMid();
  }

  // getters
  public get app(): Express { return this._app; }

  private get routerManager(): Router { return this._routerManager; }

  // private methods
  private initMids(): void {
    this.app.use(express.json());
    this.app.use(this.routerManager);
  }

  private initRoutes(): void {
    this.routerManager.use(pathNames.login, new routers.LoginRouter().router);
    this.routerManager.use(pathNames.health, new routers.HealthRouter().router);
  }

  private initErrorMid(): void {
    this.app.use(ErrorMid.errorHandler);
  }
}
