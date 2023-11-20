// types
import { jwtTypes, login } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência de testes sobre o utilitário RequestValidators', () => {
  const validEmail: string = 'valid.email@email.com';
  const validPassWord: string = 'validPassWord';

  test('Verifica se lança um erro quando o campo authorization não é enviado', () => {
    const headers = {} as jwtTypes.authorization;
    expect(() => RequestValidators.authorizationField(headers)).toThrow(new RequestError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se lança um erro quando algum dos campos de login não são enviados', () => {
    const bodyEmpty = {} as login.LoginRequest;
    expect(() => RequestValidators.loginFields(bodyEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyWithoutPassword = { email: validEmail } as login.LoginRequest;

    expect(() => RequestValidators.loginFields(bodyWithoutPassword)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyWithoutEmail = { password: validPassWord } as login.LoginRequest;

    expect(() => RequestValidators.loginFields(bodyWithoutEmail)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Verifica se lança um erro quando algum dos campos de login estão vazios', () => {
    const bodyEmptyFields = { email: '', password: '' } as login.LoginRequest;
    expect(() => RequestValidators.loginFields(bodyEmptyFields)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyPasswordEmpty = { email: validEmail, password: '' } as login.LoginRequest;

    expect(() => RequestValidators.loginFields(bodyPasswordEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyEmailEmpty = { email: '', password: validPassWord } as login.LoginRequest;

    expect(() => RequestValidators.loginFields(bodyEmailEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_LOGIN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
