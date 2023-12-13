// types
import { requestTypes as RT } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Mocks
import { request } from '../../mocks/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência sobre os validadores de campos de registro de novos usuários', () => {
  test('Se lança um erro caso o formato fornecido não seja um array', () => {
    expect(() => RequestValidators.arrayValidator({} as [])).toThrow(new RequestError({
      message: errorMessages.INVALID_FORMAT_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso seja enviados um corpo vazio', () => {
    const bodyEmpty = {} as RT.NewUserRequest;
    expect(() => RequestValidators.userRegisterFields(bodyEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo "name" não seja enviado', () => {
    const bodyWithoutName = request.bodyNoName as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutName)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo "pcd" não seja enviado', () => {
    const bodyWithoutPcd = request.bodyNoPcd as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutPcd)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo "ppp" não seja enviado', () => {
    const bodyWithoutPpp = request.bodyNoPpp as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutPpp)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo "registry" não seja enviado', () => {
    const bodyWithoutRegistry = request.bodyNoRegistry as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutRegistry)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo "backupRegister" não seja enviado', () => {
    const bodyWithoutBackup = request.bodyNoBackup as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutBackup)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo "globalPosition" não seja enviado', () => {
    const bodyWithoutGlobal = request.bodyNoGlobal as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterFields(bodyWithoutGlobal)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
