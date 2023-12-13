// Types
import { login } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência sobre os validadores da rota login', () => {
  const validEmail: string = 'valid.email@email.com';
  const validPassWord: string = 'validPassWord';

  test('Se lança um erro caso algum dos campos de login não sejam enviados', () => {
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

  test('Se lança um erro caso algum dos campos de login estejam vazios', () => {
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
