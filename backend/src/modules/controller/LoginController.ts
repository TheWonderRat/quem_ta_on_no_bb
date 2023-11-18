// Libraries
import { Request, Response } from 'express';

// Abstract controller
import AbstractController from '../../classes/controller.class';

// types
import { login, jwtTypes } from '../../types/exporter';

// SSOT
import { httpStatus } from '../../SSOT/exporter';

// service
import LoginService from '../service/LoginService';

export default class LoginController extends AbstractController<LoginService> {
  constructor() {
    super(new LoginService());
  }

  // public methods
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password }: login.LoginRequest = request.body;
    const token: jwtTypes.token = await this.service.validateUser(email, password);
    return response.status(httpStatus.OK).send(token);
  }
}
