// library
import { NextFunction, Request, Response } from 'express';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Types
import { userTypes } from '../../../app/types/exporter';

// Errors
import { RequestError } from '../../../app/shared/utils/exporter';

// Middleware
import { UserMid } from '../../../app/middlewares/exporter';

describe('Sequência de testes sobre o middleware User', () => {
  // Configurações iniciais
  const req: Request = {} as Request;
  const res: Response = {} as Response;
  let next: NextFunction;

  const bodyFull: userTypes.UserRequest = {
    name: 'nome',
    pcd: true,
    ppp: false,
    registry: 123456,
  };

  beforeEach(() => { next = jest.fn().mockReturnValue(null); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se o middleware valida corretamente os campos de usuário', () => {
    req.body = bodyFull;

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  test('Se o middleware lança um erro quando algum campo está ausente', () => {
    const bodyNoPcd = { name: 'nome', ppp: false, registry: 123456 } as typeof bodyFull;
    const bodyNoPpp = { name: 'nome', pcd: true, registry: 123456 } as typeof bodyFull;
    const bodyNoName = { pcd: true, ppp: false, registry: 123456 } as typeof bodyFull;
    const bodyNoRegistry = { name: 'nome', pcd: true, ppp: false } as typeof bodyFull;

    [bodyNoName, bodyNoPcd, bodyNoPpp, bodyNoRegistry]
      .forEach((body: userTypes.UserRequest, index: number) => {
        const onePlus: number = 1;

        req.body = body;

        UserMid.validateUserFields(req, res, next);

        expect(next).toHaveBeenCalledTimes(index + onePlus);
        expect(next).toHaveBeenCalledWith(new RequestError({
          message: errorMessages.MISSING_FIELD_REGISTER,
          statusCode: httpStatus.BAD_REQUEST,
        }));
      });
  });

  test('Verifica se o middleware lança um erro quando o campo "nome" é enviado vazio', () => {
    const bodyEmptyName: userTypes.UserRequest = {
      name: '',
      pcd: true,
      ppp: false,
      registry: 123456,
    };

    req.body = bodyEmptyName;

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "register" é enviado com valor não numérico', () => {
    const bodyRegisterNoNumber = {
      name: 'nome',
      pcd: true,
      ppp: false,
      registry: 'valor_8_não_numérico',
    };

    req.body = bodyRegisterNoNumber;

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_REGISTRY,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "PCD" não for booleano', () => {
    const bodyPcdNoBool = {
      name: 'nome',
      pcd: '34',
      ppp: false,
      registry: 123456,
    };

    req.body = bodyPcdNoBool;

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_PCD,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "PPP" não for booleano', () => {
    const bodyPppNoBool = {
      name: 'nome',
      pcd: true,
      ppp: 'valor_não_booleano',
      registry: 123456,
    };

    req.body = bodyPppNoBool;

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_PPP,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
