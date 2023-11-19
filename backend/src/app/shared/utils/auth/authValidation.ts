// types
import { jwtTypes } from '../../../types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../SSOT/exporter';

// Error
import AppError from '../error/errorConstructor';

// Helpers
import * as checkers from '../../helpers/auth/token';

export default function authValidation(authHeader: jwtTypes.authorization): void {
  if (checkers.checkKey(authHeader)) {
    throw new AppError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  if (checkers.checkNull(authHeader.authorization)) {
    throw new AppError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
}
