// Libraries
import { Request, Response } from 'express';

// SSOT
import { httpStatus } from '../../../app/SSOT/exporter';

// Service
import { LoginService } from '../../../app/modules/service/exporter';

// Camada controller a ser testada
import { LoginController } from '../../../app/modules/controller/exporter';

describe('Sequência de testes sobre a camada "LoginController"', () => {
  // Configurações iniciais
  const controller = new LoginController();
  const oneCall: number = 1;

  const req = {} as Request;
  const res = {} as Response;

  const validEmail: string = 'valid_email';
  const validToken: string = 'valid_token';
  const validPassword: string = 'valid_password';

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se retorna um token em caso de sucesso da autenticação', async () => {
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    req.body = { email: validEmail, password: validPassword };

    const spy = jest.spyOn(LoginService.prototype, 'validateUser')
      .mockImplementation(async () => ({ token: validToken }));

    await controller.login(req, res);

    expect(spy).toHaveBeenCalledTimes(oneCall);
    expect(spy).toHaveBeenCalledWith(validEmail, validPassword);

    expect(res.status).toHaveBeenCalledTimes(oneCall);
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);

    expect(res.send).toHaveBeenCalledTimes(oneCall);
    expect(res.send).toHaveBeenCalledWith({ token: validToken });
  });
});
