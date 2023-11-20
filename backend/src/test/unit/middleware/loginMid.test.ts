// library
import { NextFunction, Request, Response } from 'express';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Errors
import { RequestError } from '../../../app/shared/utils/exporter';

// Middleware
import { LoginMid } from '../../../app/middlewares/exporter';

describe('Sequência de testes sobre o middleware de login', () => {
  // Configurações iniciais
  const req: Request = {} as Request;
  const res: Response = {} as Response;
  let next: NextFunction;

  const validEmail = 'valid.email@email.com';
  const invalidEmail = 'invalid.email.com';
  const validPassword = 'password';

  beforeEach(() => { next = jest.fn().mockReturnValue(null); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se o middleware valida corretamente os campos de login', () => {
    req.body = { email: validEmail, password: validPassword };

    LoginMid.validateLoginFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  test('Verifica se o middleware lança um erro quando o campo de email não é enviado', () => {
    req.body = { password: 'password' };

    LoginMid.validateLoginFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se o middleware lança um erro quando o campo de password não é enviado', () => {
    req.body = { email: validEmail };

    LoginMid.validateLoginFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se o middleware lança um erro quando o campo de email é enviado vazio', () => {
    req.body = { email: '', password: validPassword };

    LoginMid.validateLoginFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se o middleware lança um erro quando o campo de password é enviado vazio', () => {
    req.body = { email: validEmail, password: '' };

    LoginMid.validateLoginFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se o middleware lança um erro quando o campo de email ter formato inválido', () => {
    req.body = { email: invalidEmail, password: validPassword };

    LoginMid.validateLoginFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new RequestError({
      message: errorMessages.INVALID_EMAIL,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
