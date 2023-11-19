// types
import { login, jwtTypes } from '../../../types/exporter';

// helpers
import { RequestChecks } from '../../helpers/exporter';

export default class Validators {
  private static readonly fieldError: string = 'All fields must be filled';
  private static readonly invalidIdError: string = 'Only numbers accepted for id';
  private static readonly tokenFieldError: string = 'Token not found';
  private static readonly emailOrPasswordError: string = 'Invalid email or password';

  // fields validators
  public static loginFields(body: login.LoginRequest): void {
    type KeyBody = keyof login.LoginRequest;

    ['password', 'email'].forEach((field: string) => {
      if (!RequestChecks.checkKeys<login.LoginRequest>(body, field)) {
        throw new Error(Validators.fieldError);
      }

      if (RequestChecks.isEmpty(body[field as KeyBody])) { throw new Error(Validators.fieldError); }
    });
  }

  public static authorizationField(headers: jwtTypes.authorization): void {
    if (!RequestChecks.checkKeys<jwtTypes.authorization>(headers, 'authorization')) {
      throw new Error(Validators.tokenFieldError);
    }
  }

  // values validators
  public static validateId(id: string): void {
    if (!RequestChecks.checkOnlyNumbers(id)) { throw new Error(Validators.invalidIdError); }
  }

  public static validateEmail(email: string): void {
    if (!RequestChecks.checkEmail(email)) { throw new Error(Validators.emailOrPasswordError); }
  }
}
