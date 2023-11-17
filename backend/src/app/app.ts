// library imports
import express, { Express, Router } from 'express';

// routes
import * as routers from '../routes/exporter';

// middleware
import { ErrorMid } from '../middlewares/exporter';

// SSOT
import { pathNames } from '../SSOT/exporter';

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
    this.routerManager.use(pathNames.health, new routers.HealthRouter().router);
    this.routerManager.use(pathNames.login, new routers.LoginRouter().router);
  }

  private initErrorMid(): void {
    this.app.use(ErrorMid.errorHandler);
  }
}
// app.use(cors());
// app.use(routes);

// app.use((error: Error, __request: Request, response: Response) => {
//   if (error instanceof AppError) {
//     return response.status(error.statusCode).json({
//       status: 'error',
//       message: error.message,
//     });
//   }

//   return response.status(500).json({
//     status: 'error',
//     message: 'Internal server error and this is a custom error!',
//   });
// });
