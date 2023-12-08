// library imports
import { Router } from 'express';

// SSOT
import { pathNames } from '../SSOT/exporter';

// types
import { ControllerTypes } from '../types/controllers/controllerTypes';

export default abstract class AbstractRouter<T extends ControllerTypes> {
  private readonly _router: Router;
  private readonly _controller: T;
  private readonly _rootPath: string = pathNames.root;

  constructor(router: Router, controller: T) {
    this._router = router;
    this._controller = controller;
  }

  public get router(): Router { return this._router; }

  protected get rootPath(): string { return this._rootPath; }

  protected get controller(): T { return this._controller; }

  protected abstract initRoutes(): void;
}
