// Libraries
import { Request, Response, NextFunction as Next } from 'express';

// Abstract controller
import AbstractController from '../../classes/controller.class';

// types
import { login, jwtTypes } from '../../types/exporter';

// SSOT
import { httpStatus } from '../../SSOT/exporter';

// service
import { LoginService } from '../service/exporter';

export default class LoginController extends AbstractController<LoginService> {
  constructor() {
    super(new LoginService());
    this.login = this.login.bind(this);
  }

  // public methods
  public async login(request: Request, response: Response, next: Next): Promise<Response | void> {
    try {
      const { email, password }: login.LoginRequest = request.body;
      const token: jwtTypes.token = await this.service.validateUser(email, password);
      return response.status(httpStatus.OK).send(token);
    } catch (error) {
      return next(error);
    }
  }
}
