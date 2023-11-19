// Library
import { NextFunction, Request, Response } from 'express';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Errors
import { RequestError } from '../../../app/shared/utils/exporter';

// Middleware
import { ErrorMid } from '../../../app/middlewares/exporter';

describe('Sequência de testes sobre o middleware de erros', () => {
  // Configurações iniciais
  const req: Request = {} as Request;
  const res: Response = {} as Response;
  let next: NextFunction;

  beforeEach(() => {
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se o método "errorHandler" retorna o status e a mensagem do erro corretamente', () => {
    const error = new RequestError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    });

    ErrorMid.errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(error.errorInfo.statusCode);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ message: error.errorInfo.message });
  });
});
