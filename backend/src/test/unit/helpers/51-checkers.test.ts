// Helpers
import { RequestChecks } from '../../../app/shared/helpers/exporter';

describe('Sequência de testes sobre os métodos de checagem', () => {
  test('Verifica se o método "checkKeys" valida corretamente as chaves de um objeto', () => {
    const request = { email: 'john.stuart@email.com', password: '123456' };

    expect(RequestChecks.checkKeys(request, 'email')).toBeTruthy();
    expect(RequestChecks.checkKeys(request, 'password')).toBeTruthy();
    expect(RequestChecks.checkKeys(request, 'name')).toBeFalsy();
  });

  test('Verifica se o método "isEmpty" valida corretamente uma string vazia', () => {
    expect(RequestChecks.isEmpty('')).toBeTruthy();
    expect(RequestChecks.isEmpty('John Stuart')).toBeFalsy();
  });

  test('Verifica se o método "checkEmail" valida corretamente um email', () => {
    const validEmail = 'email.name@email.com';
    const invalidEmail = 'email.name@';

    expect(RequestChecks.checkEmail(validEmail)).toBeTruthy();
    expect(RequestChecks.checkEmail(invalidEmail)).toBeFalsy();
  });

  test('Verifica se o método "checkOnlyNumbers" valida corretamente uma string numérica', () => {
    const validNumber = '123456';
    const invalidNumber = '123456a';

    expect(RequestChecks.checkOnlyNumbers(validNumber)).toBeTruthy();
    expect(RequestChecks.checkOnlyNumbers(invalidNumber)).toBeFalsy();
  });
});
