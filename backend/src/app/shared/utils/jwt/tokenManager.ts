// libraries
import jwt from 'jsonwebtoken';

// SSOT
import { jwtConfig, errorMessages, httpStatus } from '../../../SSOT/exporter';

// types
import { jwtTypes } from '../../../types/exporter';

// libraries
import AuthError from '../error/authError';

export default class TokenManager {
  public static generateToken(payload: jwtTypes.payload): string {
    return jwt.sign(payload, jwtConfig.JWT_SECRET, jwtConfig.JWT_SIGN_OPTIONS);
  }

  public static validateToken(token: string): void {
    try {
      jwt.verify(token, jwtConfig.JWT_SECRET);
    } catch (__e) {
      throw new AuthError({
        message: errorMessages.USER_NOT_AUTHENTICATED,
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }
  }
}
