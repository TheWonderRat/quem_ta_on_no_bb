// types
import { authorization } from '../../../types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../SSOT/exporter';

// Error
import AppError from '../error/errorConstructor';

// Helpers
import * as checkers from '../../helpers/auth/token';

export default function authValidation(authHeader: authorization): void {
  if (checkers.checkKey(authHeader)) {
    throw new AppError(errorMessages.MISSING_TOKEN, httpStatus.HttpStatusBadRequest);
  }

  if (checkers.checkNull(authHeader.authorization)) {
    throw new AppError(errorMessages.MISSING_TOKEN, httpStatus.HttpStatusBadRequest);
  }
}
