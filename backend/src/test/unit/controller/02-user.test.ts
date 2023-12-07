// Libraries
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

// SSOT
import { httpStatus, jwtConfig, bcryptConfig, errorMessages } from '../../../app/SSOT/exporter';

// Types
import { requestTypes as RT } from '../../../app/types/exporter';

// Mocks
import { users } from '../../mocks/exporter';

// Utils
import { ServerError } from '../../../app/shared/utils/exporter';

// Service
import { UserService } from '../../../app/modules/service/exporter';

// Camada controller a ser testada
import { UserController } from '../../../app/modules/controller/exporter';

describe('Sequência de testes sobre a camada "UserController"', () => {
  // Configurações iniciais
  const controller = new UserController();

  const req = {} as Request;
  const res = {} as Response;
  let next: NextFunction;

  beforeEach(() => {
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn().mockReturnValue(null);
  });

  afterEach(() => { jest.clearAllMocks(); });

  const validUuid = 'valid_uuid';
  const firstPosition = 0;
  const secondPosition = 1;

  const newUsers: RT.NewUserRequest[] = [
    {
      name: users[firstPosition].name,
      pcd: users[firstPosition].pcd,
      ppp: users[firstPosition].ppp,
      registry: users[firstPosition].registry,
      backupRegister: false,
      globalPosition: users[firstPosition].globalPosition,
    },
    {
      name: users[secondPosition].name,
      pcd: users[secondPosition].pcd,
      ppp: users[secondPosition].ppp,
      registry: users[secondPosition].registry,
      backupRegister: false,
      globalPosition: users[secondPosition].globalPosition,
    },
  ];

  const usersWithHash: RT.NewUserRecord[] = newUsers
    .map((newUser: RT.NewUserRequest) => ({ ...newUser, passwordHash: 'hash' }));

  test('Se o método "registerUser" retorna um id e a matrícula em caso de sucesso', async () => {
    const expectedResponse = [
      { id: validUuid, registry: users[firstPosition].registry },
      { id: validUuid, registry: users[secondPosition].registry },
    ];

    const spyBcrypt = jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hash');
    const spyService = jest.spyOn(UserService.prototype, 'createUsers')
      .mockImplementation(async () => (expectedResponse));

    req.body = newUsers;

    const numberOfCalls = 2;
    const firstCall = 1;
    const secondCall = 2;

    await controller.registerUsers(req, res, next);

    expect(spyBcrypt).toHaveBeenCalledTimes(numberOfCalls);
    expect(spyBcrypt).toHaveBeenNthCalledWith(
      firstCall,
      `${users[firstPosition].registry}${users[firstPosition].name}${jwtConfig.JWT_SECRET}`,
      bcryptConfig.BCRYPT_SALT_ROUNDS,
    );
    expect(spyBcrypt).toHaveBeenNthCalledWith(
      secondCall,
      `${users[secondPosition].registry}${users[secondPosition].name}${jwtConfig.JWT_SECRET}`,
      bcryptConfig.BCRYPT_SALT_ROUNDS,
    );

    expect(spyService).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalledWith(usersWithHash);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(expectedResponse);
  });

  test('Se o método "registerUser" chama o "next" com o erro em caso de falha', async () => {
    const spyBcrypt = jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hash');
    const spyService = jest.spyOn(UserService.prototype, 'createUsers')
      .mockImplementation(async () => {
        throw new ServerError({
          message: errorMessages.DATABASE_NOT_FOUND,
          statusCode: httpStatus.NOT_FOUND,
        });
      });

    req.body = newUsers;

    await controller.registerUsers(req, res, next);

    expect(spyBcrypt).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new ServerError({
      message: errorMessages.DATABASE_NOT_FOUND,
      statusCode: httpStatus.NOT_FOUND,
    }));
  });
});
