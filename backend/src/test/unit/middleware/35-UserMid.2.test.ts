// library
import { Request, Response, NextFunction } from 'express';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Types
import { requestTypes as RT } from '../../../app/types/exporter';

// Mocks
import { request } from '../../mocks/exporter';

// Errors
import { RequestError } from '../../../app/shared/utils/exporter';

// Middleware
import { UserMid } from '../../../app/middlewares/exporter';

describe('Sequência de testes sobre o middleware User', () => {
  // Configurações iniciais
  const req: Request = {} as Request;
  const res: Response = {} as Response;
  let next: NextFunction;

  const randomNumber: number = 34;

  let fullBody = structuredClone(request.bodyFull);

  beforeEach(() => {
    const restoreFullBody = structuredClone(request.bodyFull);
    fullBody = restoreFullBody;
    next = jest.fn().mockReturnValue(null);
  });

  test('Verifica se o middleware valida corretamente os campos de usuário', () => {
    req.body = [fullBody];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  test('Se o middleware lança um erro quando algum campo está ausente', () => {
    const bodyOptions: RT.NewUserRequest[][] = [
      [request.bodyNoName], [request.bodyNoPcd],
      [request.bodyNoPpp], [request.bodyNoRegistry],
      [request.bodyNoBackup], [request.bodyNoGlobal],
    ] as RT.NewUserRequest[][];

    bodyOptions.forEach((body: RT.NewUserRequest[], index: number) => {
      const one: number = 1;

      req.body = body;

      UserMid.validateUserFields(req, res, next);

      expect(next).toHaveBeenCalledTimes(index + one);
      expect(next).toHaveBeenCalledWith(new RequestError({
        message: errorMessages.MISSING_FIELD_REGISTER,
        statusCode: httpStatus.BAD_REQUEST,
      }));
    });
  });

  test('Verifica se o middleware lança um erro quando o campo "nome" é enviado vazio', () => {
    const bodyEmptyName: RT.NewUserRequest = fullBody;
    bodyEmptyName.name = '';

    req.body = [bodyEmptyName];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "register" é enviado com valor não numérico', () => {
    const bodyRegisterNoNumber = fullBody;
    bodyRegisterNoNumber.registry = 'no_number' as unknown as number;

    req.body = [bodyRegisterNoNumber];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_REGISTRY,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "globalPosition" é enviado com valor não numérico', () => {
    const bodyGlobalPositionNoNumber = fullBody;
    bodyGlobalPositionNoNumber.globalPosition = 'no_number' as unknown as number;

    req.body = [bodyGlobalPositionNoNumber];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_GLOBAL_POSITION,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "pcdPosition" é enviado com valor não numérico', () => {
    const bodyPcdPositionNoNumber = fullBody;
    bodyPcdPositionNoNumber.pcdPosition = 'no_number' as unknown as number;

    req.body = [bodyPcdPositionNoNumber];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_PCD_POSITION,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "pppPosition" é enviado com valor não numérico', () => {
    const bodyPppPositionNoNumber = fullBody;
    bodyPppPositionNoNumber.pppPosition = 'no_number' as unknown as number;

    req.body = [bodyPppPositionNoNumber];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_PPP_POSITION,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "PCD" não for booleano', () => {
    const bodyPcdNoBool = fullBody;
    bodyPcdNoBool.pcd = randomNumber as unknown as boolean;

    req.body = [bodyPcdNoBool];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_PCD,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "PPP" não for booleano', () => {
    const bodyPppNoBool = fullBody;
    bodyPppNoBool.ppp = randomNumber as unknown as boolean;

    req.body = [bodyPppNoBool];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_PPP,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se o middleware lança um erro quando o campo "backupRegister" não for booleano', () => {
    const bodyPppNoBool = fullBody;
    bodyPppNoBool.backupRegister = randomNumber as unknown as boolean;

    req.body = [bodyPppNoBool];

    UserMid.validateUserFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_BACKUP_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
