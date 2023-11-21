// Types
import { login, jwtTypes, requestTypes } from '../../../types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../SSOT/exporter';

// Error
import RequestError from '../error/requestError';

// helpers
import { RequestChecks } from '../../helpers/exporter';

export default class Validators {
  // fields validators
  public static loginFields(body: login.LoginRequest): void {
    type KeyBody = keyof login.LoginRequest;

    ['password', 'email'].forEach((field: string) => {
      if (!RequestChecks.checkKeys<login.LoginRequest>(body, field)) {
        throw new RequestError({
          message: errorMessages.MISSING_FIELD_LOGIN,
          statusCode: httpStatus.BAD_REQUEST,
        });
      }

      if (RequestChecks.isEmpty(body[field as KeyBody])) {
        throw new RequestError({
          message: errorMessages.MISSING_FIELD_LOGIN,
          statusCode: httpStatus.BAD_REQUEST,
        });
      }
    });
  }

  public static userRegisterFields(body: requestTypes.NewUserRequest): void {
    const mandatoryFields: string[] = [
      'pcd', 'ppp', 'name', 'registry',
      'backupRegister', 'globalPosition',
    ];

    mandatoryFields.forEach((field: string) => {
      if (!RequestChecks.checkKeys<requestTypes.NewUserRequest>(body, field)) {
        throw new RequestError({
          message: errorMessages.MISSING_FIELD_REGISTER,
          statusCode: httpStatus.BAD_REQUEST,
        });
      }
    });

    if (RequestChecks.isEmpty(body.name)) {
      throw new RequestError({
        message: errorMessages.MISSING_FIELD_REGISTER,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
  }

  public static userRegisterBooleanFields(body: requestTypes.NewUserRequest): void {
    if (typeof body.pcd !== 'boolean') {
      throw new RequestError({
        message: errorMessages.INVALID_PCD,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    if (typeof body.ppp !== 'boolean') {
      throw new RequestError({
        message: errorMessages.INVALID_PPP,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    if (typeof body.backupRegister !== 'boolean') {
      throw new RequestError({
        message: errorMessages.INVALID_BACKUP_REGISTER,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
  }

  public static userRegisterNumberFields(body: requestTypes.NewUserRequest): void {
    if (!RequestChecks.checkOnlyNumbers(body.registry.toString())) {
      throw new RequestError({
        message: errorMessages.INVALID_REGISTRY,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    if (!RequestChecks.checkOnlyNumbers(body.globalPosition.toString())) {
      throw new RequestError({
        message: errorMessages.INVALID_GLOBAL_POSITION,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    if (body.pcdPosition && !RequestChecks.checkOnlyNumbers(body.pcdPosition.toString())) {
      throw new RequestError({
        message: errorMessages.INVALID_PCD_POSITION,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    if (body.pcdPosition && !RequestChecks.checkOnlyNumbers(body.pcdPosition.toString())) {
      throw new RequestError({
        message: errorMessages.INVALID_PPP_POSITION,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
  }

  public static authorizationField(headers: jwtTypes.authorization): void {
    if (!RequestChecks.checkKeys<jwtTypes.authorization>(headers, 'authorization')) {
      throw new RequestError({
        message: errorMessages.MISSING_TOKEN,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
  }

  // values validators
  // public static validateId(id: string): void {
  //   if (!RequestChecks.checkOnlyNumbers(id)) { throw new Error(Validators.invalidIdError); }
  // }

  public static validateEmail(email: string): void {
    if (!RequestChecks.checkEmail(email)) {
      throw new RequestError({
        message: errorMessages.INVALID_EMAIL,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
  }
}
