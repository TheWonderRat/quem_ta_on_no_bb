// types
import { jwtTypes } from '../../../app/types/exporter';

// SSOT
import { errorMessages, httpStatus } from '../../../app/SSOT/exporter';

// Utilitário a ser testado
import { RequestError, RequestValidators } from '../../../app/shared/utils/exporter';

describe('Sequência sobre os validadores de token', () => {
  test('Se lança um erro caso o campo authorization não seja enviado', () => {
    const headers = {} as jwtTypes.authorization;
    expect(() => RequestValidators.authorizationField(headers)).toThrow(new RequestError({
      message: errorMessages.MISSING_TOKEN,
      statusCode: httpStatus.BAD_REQUEST,
    }));
  });
});
