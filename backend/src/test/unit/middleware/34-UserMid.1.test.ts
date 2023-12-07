// library
import { Request, Response, NextFunction } from 'express';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

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

  let fullBody = structuredClone(request.bodyFull);

  beforeEach(() => {
    const restoreFullBody = structuredClone(request.bodyFull);
    fullBody = restoreFullBody;
    next = jest.fn().mockReturnValue(null);
  });

  test('Se o middleware valida corretamente os corpo básico da requisição', () => {
    req.body = [fullBody];

    UserMid.validateFormat(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  test('Se o middleware retorna erro caso o corpo da requisição não seja um array', () => {
    req.body = fullBody;

    UserMid.validateFormat(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new RequestError({
        message: errorMessages.INVALID_FORMAT_REGISTER,
        statusCode: httpStatus.BAD_REQUEST,
      }),
    );
  });
});
