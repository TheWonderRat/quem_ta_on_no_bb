// types
import { jwtTypes, login, requestTypes as RT } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência de testes sobre o utilitário RequestValidators', () => {
  const validEmail: string = 'valid.email@email.com';
  const validPassWord: string = 'validPassWord';

  test('Se lança um erro caso o campo authorization não seja enviado', () => {
    const headers = {} as jwtTypes.authorization;
    expect(() => RequestValidators.authorizationField(headers)).toThrow(new RequestError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

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

  test('Se lança um erro caso algum dos campos de registro não sejam enviados', () => {
    const bodyEmpty = {} as RT.NewUserRequest;
    expect(() => RequestValidators.userRegisterFields(bodyEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyWithoutName = { pcd: true, ppp: true, registry: 123456 } as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutName)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyWithoutPcd = { name: 'validName', ppp: true, registry: 123456 } as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutPcd)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyWithoutPpp = { name: 'validName', pcd: true, registry: 123456 } as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutPpp)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyWithoutRegistry = { name: 'validName', pcd: true, ppp: true } as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutRegistry)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso algum dos campos de registro tenha formato inválido', () => {
    const bodyNameEmpty: RT.NewUserRequest = { name: '', pcd: true, ppp: false, registry: 123456 };

    expect(() => RequestValidators.userRegisterFields(bodyNameEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyPcdInvalid = {
      name: 'validName',
      pcd: 'valor_não_booleano',
      ppp: true,
      registry: 123456 } as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyPcdInvalid)).toThrow(new RequestError({
      message: errorMessages.INVALID_PCD,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyPppInvalid = {
      name: 'validName',
      pcd: true,
      ppp: 'valor_não_booleano',
      registry: 123456 } as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyPppInvalid)).toThrow(new RequestError({
      message: errorMessages.INVALID_PPP,
      statusCode: httpStatus.BAD_REQUEST,
    }));

    const bodyRegistryInvalid = {
      name: 'validName',
      pcd: true,
      ppp: true,
      registry: 'valor_8_inválido' } as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyRegistryInvalid)).toThrow(new RequestError({
      message: errorMessages.INVALID_REGISTRY,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
