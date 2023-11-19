// types
import { jwtTypes } from '../../../types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../SSOT/exporter';

// Error
import RequestError from '../error/requestError';

// Helpers
import * as checkers from '../../helpers/auth/token';

export default function authValidation(authHeader: jwtTypes.authorization): void {
  if (checkers.checkKey(authHeader)) {
    throw new RequestError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
}
