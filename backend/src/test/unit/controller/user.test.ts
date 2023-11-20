// Libraries
import { Request, Response } from 'express';

// SSOT
import { httpStatus } from '../../../app/SSOT/exporter';

// Types
import { userTypes } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Service
import { UserService } from '../../../app/modules/service/exporter';

// Camada controller a ser testada
import { UserController } from '../../../app/modules/controller/exporter';

describe('Sequência de testes sobre a camada "UserController"', () => {
  // Configurações iniciais
  const controller = new UserController();

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
  });

  afterEach(() => { jest.clearAllMocks(); });

  const validUuid = 'valid_uuid';
  const firstPosition = 0;

  const newUser: userTypes.UserRequest = {
    name: users[firstPosition].name,
    pcd: users[firstPosition].pcd,
    ppp: users[firstPosition].ppp,
    registry: users[firstPosition].registry,
  };

  test('Se o método "registerUser" retorna um id em caso de sucesso', async () => {
    const spy = jest.spyOn(UserService.prototype, 'createUser')
      .mockImplementation(async () => ({ id: validUuid }));

    req.body = newUser;

    await controller.registerUser(req, res);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newUser);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ id: validUuid });
  });
});
