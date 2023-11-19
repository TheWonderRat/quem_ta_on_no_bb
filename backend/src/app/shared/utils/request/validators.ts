// types
import { login, jwtTypes } from '../../../types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../SSOT/exporter';

// Error
import RequestError from '../error/requestError';

// helpers
import { RequestChecks } from '../../helpers/exporter';

export default class Validators {
  private static readonly invalidIdError: string = 'Only numbers accepted for id';
  private static readonly emailOrPasswordError: string = 'Invalid email or password';

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
