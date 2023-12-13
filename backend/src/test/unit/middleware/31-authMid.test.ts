// library
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

// SSOT
import { errorMessages, httpStatus, jwtConfig } from '../../../app/SSOT/exporter';

// Errors
import { RequestError, AuthError } from '../../../app/shared/utils/exporter';

// Middleware
import { AuthMid } from '../../../app/middlewares/exporter';

describe('Sequência de testes sobre o middleware de autenticação', () => {
  // Configurações iniciais
  const req: Request = {} as Request;
  const res: Response = {} as Response;
  let next: NextFunction;

  beforeEach(() => { next = jest.fn().mockReturnValue(null); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se o método "hasToken" valida corretamente a existência do token', () => {
    req.headers = { authorization: 'Bearer token' };
    AuthMid.hasToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  test('Verifica se o método "hasToken" retorna um erro quando o token não existe', () => {
    req.headers = {};
    AuthMid.hasToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se o método "hasValidToken" valida corretamente o token', () => {
    const validToken = 'valid_token';
    req.headers = { authorization: `Bearer ${validToken}` };
    const verifySpy = jest.spyOn(jsonwebtoken, 'verify').mockImplementation(() => null);

    AuthMid.hasValidToken(req, res, next);

    expect(verifySpy).toHaveBeenCalled();
    expect(verifySpy).toHaveBeenCalledWith(validToken, jwtConfig.JWT_SECRET);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  test('Verifica se o método "hasValidToken" retorna um erro quando o token não é válido', () => {
    const invalidToken = 'invalid_token';
    req.headers = { authorization: `Bearer ${invalidToken}` };
    const verifySpy = jest.spyOn(jsonwebtoken, 'verify').mockImplementation(() => {
      throw new AuthError({
        message: errorMessages.USER_NOT_AUTHENTICATED,
        statusCode: httpStatus.UNAUTHORIZED,
      });
    });

    AuthMid.hasValidToken(req, res, next);

    expect(verifySpy).toHaveBeenCalled();
    expect(verifySpy).toHaveBeenCalledWith(invalidToken, jwtConfig.JWT_SECRET);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new AuthError({
      message: errorMessages.USER_NOT_AUTHENTICATED,
      statusCode: httpStatus.UNAUTHORIZED,
    }));
  });
});
