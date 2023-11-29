"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Utilitário a ser testado
const exporter_2 = require("../../../app/shared/utils/exporter");
describe('Sequência sobre os validadores da rota login', () => {
    const validEmail = 'valid.email@email.com';
    const validPassWord = 'validPassWord';
    test('Se lança um erro caso algum dos campos de login não sejam enviados', () => {
        const bodyEmpty = {};
        expect(() => exporter_2.RequestValidators.loginFields(bodyEmpty)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
        const bodyWithoutPassword = { email: validEmail };
        expect(() => exporter_2.RequestValidators.loginFields(bodyWithoutPassword)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
        const bodyWithoutEmail = { password: validPassWord };
        expect(() => exporter_2.RequestValidators.loginFields(bodyWithoutEmail)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso algum dos campos de login estejam vazios', () => {
        const bodyEmptyFields = { email: '', password: '' };
        expect(() => exporter_2.RequestValidators.loginFields(bodyEmptyFields)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
        const bodyPasswordEmpty = { email: validEmail, password: '' };
        expect(() => exporter_2.RequestValidators.loginFields(bodyPasswordEmpty)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
        const bodyEmailEmpty = { email: '', password: validPassWord };
        expect(() => exporter_2.RequestValidators.loginFields(bodyEmailEmpty)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
