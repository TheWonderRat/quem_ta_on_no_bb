// library imports
import express, { Express, Router } from 'express';

// routes
import RouterManager from '../routes/router';

// middleware
import { ErrorMid } from '../middlewares/exporter';

export default class App {
  // private properties
  private readonly _app: Express;
  private readonly _router: Router;

  constructor() {
    this._app = express();
    this._router = new RouterManager().router;
    this.initMids();
    this.initRoutes();
    this.initErrorMid();
  }

  // getters
  public get app(): Express { return this._app; }

  private get router(): Router { return this._router; }

  // private methods
  private initMids(): void {
    this.app.use(express.json());
  }

  private initRoutes(): void {
    this.app.use(this.router);
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
