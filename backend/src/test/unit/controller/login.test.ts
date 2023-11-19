// Libraries
import { Request, Response, NextFunction } from 'express';

// SSOT
import { httpStatus, errorMessages } from '../../../app/SSOT/exporter';

// Utils
import { AppError } from '../../../app/shared/utils/exporter';

// Service
import { LoginService } from '../../../app/modules/service/exporter';

// Camada controller a ser testada
import { LoginController } from '../../../app/modules/controller/exporter';

describe('Sequência de testes sobre a camada "LoginController"', () => {
  // Configurações iniciais
  const controller = new LoginController();

  const req = {} as Request;
  const res = {} as Response;
  let next: NextFunction;

  const validEmail: string = 'valid_email';
  const validToken: string = 'valid_token';
  const validPassword: string = 'valid_password';

  const invalidEmail: string = 'invalid_email';
  const invalidPassword: string = 'invalid_password';

  beforeEach(() => {
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn().mockReturnValue(null);
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se retorna um token em caso de sucesso da autenticação', async () => {
    req.body = { email: validEmail, password: validPassword };

    const spy = jest.spyOn(LoginService.prototype, 'validateUser')
      .mockImplementation(async () => ({ token: validToken }));

    await controller.login(req, res, next);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(validEmail, validPassword);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);

    expect(next).not.toHaveBeenCalled();

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ token: validToken });
  });

  test('Verifica se a função next é chamada corretamente em caso de erro', async () => {
    req.body = { email: invalidEmail, password: invalidPassword };

    const spy = jest.spyOn(LoginService.prototype, 'validateUser')
      .mockImplementation(async () => {
        throw new AppError({
          message: errorMessages.USER_NOT_FOUND,
          statusCode: httpStatus.NOT_FOUND });
      });

    await controller.login(req, res, next);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(invalidEmail, invalidPassword);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new AppError({
        message: errorMessages.USER_NOT_FOUND,
        statusCode: httpStatus.NOT_FOUND }),
    );
  });
});
