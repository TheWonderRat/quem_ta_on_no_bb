// Types
import { requestTypes as RT } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Mocks
import { request } from '../../mocks/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência sobre os validadores de formato de registro de novos usuários', () => {
  test('Se lança um erro caso o campo de registro "name" tenha formato inválido', () => {
    const bodyNameEmpty = request.bodyInvalidName;

    expect(() => RequestValidators.userRegisterFields(bodyNameEmpty)).toThrow(new RequestError({
      message: errorMessages.MISSING_FIELD_REGISTER,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });

  test('Se lança um erro caso o campo de registro "pcd" seja não booleano', () => {
    const bodyPcdInvalid = request.bodyInvalidPcd as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterBooleanFields(bodyPcdInvalid))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_PCD,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });

  test('Se lança um erro caso o campo de registro "ppp" seja não booleano', () => {
    const bodyPppInvalid = request.bodyInvalidPpp as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterBooleanFields(bodyPppInvalid))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_PPP,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });

  test('Se lança um erro caso o campo de registro "backupRegister" seja não booleano', () => {
    const bodyRegistryBackup = request.bodyInvalidBackup as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterBooleanFields(bodyRegistryBackup))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_BACKUP_REGISTER,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });

  test('Se lança um erro caso o campo de registro "globalPosition" seja não numérico', () => {
    const bodyGlobalPosition = request.bodyInvalidGlobal as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterNumberFields(bodyGlobalPosition))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_GLOBAL_POSITION,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });

  test('Se lança um erro caso o campo de registro "pcdPosition" seja não numérico', () => {
    const bodyPcdPosition = request.bodyInvalidPcdPosition as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterNumberFields(bodyPcdPosition))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_PCD_POSITION,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });

  test('Se lança um erro caso o campo de registro "pppPosition" seja não numérico', () => {
    const bodyPppPosition = request.bodyInvalidPppPosition as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterNumberFields(bodyPppPosition))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_PPP_POSITION,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });

  test('Se lança um erro caso o campo de registro "registry" seja não numérico', () => {
    const bodyRegistryInvalid = request.bodyInvalidRegistry as unknown as RT.NewUserRequest;

    expect(() => RequestValidators.userRegisterNumberFields(bodyRegistryInvalid))
      .toThrow(new RequestError({
        message: errorMessages.INVALID_REGISTRY,
        statusCode: httpStatus.BAD_REQUEST,
      }));
  });
});
