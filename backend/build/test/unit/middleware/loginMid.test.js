"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Errors
const exporter_2 = require("../../../app/shared/utils/exporter");
// Middleware
const exporter_3 = require("../../../app/middlewares/exporter");
describe('Sequência de testes sobre o middleware Login', () => {
    // Configurações iniciais
    const req = {};
    const res = {};
    let next;
    const validEmail = 'valid.email@email.com';
    const invalidEmail = 'invalid.email.com';
    const validPassword = 'password';
    beforeEach(() => { next = jest.fn().mockReturnValue(null); });
    afterEach(() => { jest.clearAllMocks(); });
    test('Verifica se o middleware valida corretamente os campos de login', () => {
        req.body = { email: validEmail, password: validPassword };
        exporter_3.LoginMid.validateLoginFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    test('Verifica se o middleware lança um erro quando o campo de email não é enviado', () => {
        req.body = { password: 'password' };
        exporter_3.LoginMid.validateLoginFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Verifica se o middleware lança um erro quando o campo de password não é enviado', () => {
        req.body = { email: validEmail };
        exporter_3.LoginMid.validateLoginFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Verifica se o middleware lança um erro quando o campo de email é enviado vazio', () => {
        req.body = { email: '', password: validPassword };
        exporter_3.LoginMid.validateLoginFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Verifica se o middleware lança um erro quando o campo de password é enviado vazio', () => {
        req.body = { email: validEmail, password: '' };
        exporter_3.LoginMid.validateLoginFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Verifica se o middleware lança um erro quando o campo de email ter formato inválido', () => {
        req.body = { email: invalidEmail, password: validPassword };
        exporter_3.LoginMid.validateLoginFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.RequestError({
            message: exporter_1.errorMessages.INVALID_EMAIL,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
