// types
import { Express } from 'express';

// App
import App from '../app';

// SSOT
import { serverConfig } from '../SSOT/exporter';

class Server {
  // private properties
  private readonly _app: Express;
  private readonly _port: number;

  constructor() {
    this._app = new App().app;
    this._port = serverConfig.PORT_BACK;
  }

  // getters
  public get app(): Express { return this._app; }

  public get port(): number { return this._port; }

  // public methods
  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`server started on ${serverConfig.HOST_BACK}:${this.port}`));
  }
}

new Server().start();
