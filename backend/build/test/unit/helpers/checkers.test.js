"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers
const exporter_1 = require("../../../app/shared/helpers/exporter");
describe('Sequência de testes sobre os métodos de checagem', () => {
    test('Verifica se o método "checkKeys" valida corretamente as chaves de um objeto', () => {
        const request = { email: 'john.stuart@email.com', password: '123456' };
        expect(exporter_1.RequestChecks.checkKeys(request, 'email')).toBeTruthy();
        expect(exporter_1.RequestChecks.checkKeys(request, 'password')).toBeTruthy();
        expect(exporter_1.RequestChecks.checkKeys(request, 'name')).toBeFalsy();
    });
    test('Verifica se o método "isEmpty" valida corretamente uma string vazia', () => {
        expect(exporter_1.RequestChecks.isEmpty('')).toBeTruthy();
        expect(exporter_1.RequestChecks.isEmpty('John Stuart')).toBeFalsy();
    });
    test('Verifica se o método "checkEmail" valida corretamente um email', () => {
        const validEmail = 'email.name@email.com';
        const invalidEmail = 'email.name@';
        expect(exporter_1.RequestChecks.checkEmail(validEmail)).toBeTruthy();
        expect(exporter_1.RequestChecks.checkEmail(invalidEmail)).toBeFalsy();
    });
    test('Verifica se o método "checkOnlyNumbers" valida corretamente uma string numérica', () => {
        const validNumber = '123456';
        const invalidNumber = '123456a';
        expect(exporter_1.RequestChecks.checkOnlyNumbers(validNumber)).toBeTruthy();
        expect(exporter_1.RequestChecks.checkOnlyNumbers(invalidNumber)).toBeFalsy();
    });
});
