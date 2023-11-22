// types
import { jwtTypes, login, requestTypes as RT } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Mocks
import { request } from '../../mocks/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência de testes sobre o utilitário RequestValidators', () => {
  describe('Sequência sobre os validadores de token', () => {
    test('Se lança um erro caso o campo authorization não seja enviado', () => {
      const headers = {} as jwtTypes.authorization;
      expect(() => RequestValidators.authorizationField(headers)).toThrow(new RequestError({
        message: errorMessages.MISSING_TOKEN,
        statusCode: httpStatus.BAD_REQUEST,
      }));
    });
  });

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

  describe('Sequência sobre os validadores da rota de registro de novos usuários', () => {
    let fakeUserBody = structuredClone(request.bodyFull);

    const NO_BOOLEAN_VALUE = 'valor_não_booleano' as unknown as boolean;

    const NO_NUMBER_VALUE = 'valor_não_8_numérico' as unknown as number;

    beforeEach(() => {
      const cloneUserBody = structuredClone(request.bodyFull);
      fakeUserBody = cloneUserBody;
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

    test('Se lança um erro caso o campo de registro "name" tenha formato inválido', () => {
      const bodyNameEmpty = fakeUserBody;
      bodyNameEmpty.name = '';

      expect(() => RequestValidators.userRegisterFields(bodyNameEmpty)).toThrow(new RequestError({
        message: errorMessages.MISSING_FIELD_REGISTER,
        statusCode: httpStatus.BAD_REQUEST,
      }));
    });

    test('Se lança um erro caso o campo de registro "pcd" seja não booleano', () => {
      const bodyPcdInvalid = fakeUserBody;
      bodyPcdInvalid.pcd = NO_BOOLEAN_VALUE;

      expect(() => RequestValidators.userRegisterBooleanFields(bodyPcdInvalid))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_PCD,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });

    test('Se lança um erro caso o campo de registro "ppp" seja não booleano', () => {
      const bodyPppInvalid = fakeUserBody;
      bodyPppInvalid.ppp = NO_BOOLEAN_VALUE;

      expect(() => RequestValidators.userRegisterBooleanFields(bodyPppInvalid))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_PPP,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });

    test('Se lança um erro caso o campo de registro "backupRegister" seja não booleano', () => {
      const bodyRegistryBackup = fakeUserBody;
      bodyRegistryBackup.backupRegister = NO_BOOLEAN_VALUE;

      expect(() => RequestValidators.userRegisterBooleanFields(bodyRegistryBackup))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_BACKUP_REGISTER,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });

    test('Se lança um erro caso o campo de registro "globalPosition" seja não numérico', () => {
      const bodyGlobalPosition = fakeUserBody;
      bodyGlobalPosition.globalPosition = NO_NUMBER_VALUE;

      expect(() => RequestValidators.userRegisterNumberFields(bodyGlobalPosition))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_GLOBAL_POSITION,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });

    test('Se lança um erro caso o campo de registro "pcdPosition" seja não numérico', () => {
      const bodyPcdPosition = fakeUserBody;
      bodyPcdPosition.pcdPosition = NO_NUMBER_VALUE;

      expect(() => RequestValidators.userRegisterNumberFields(bodyPcdPosition))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_PCD_POSITION,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });

    test('Se lança um erro caso o campo de registro "pppPosition" seja não numérico', () => {
      const bodyPppPosition = fakeUserBody;
      bodyPppPosition.pppPosition = NO_NUMBER_VALUE;

      expect(() => RequestValidators.userRegisterNumberFields(bodyPppPosition))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_PPP_POSITION,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });

    test('Se lança um erro caso o campo de registro "registry" seja não numérico', () => {
      const bodyRegistryInvalid = fakeUserBody;
      bodyRegistryInvalid.registry = NO_NUMBER_VALUE;

      expect(() => RequestValidators.userRegisterNumberFields(bodyRegistryInvalid))
        .toThrow(new RequestError({
          message: errorMessages.INVALID_REGISTRY,
          statusCode: httpStatus.BAD_REQUEST,
        }));
    });
  });
});
