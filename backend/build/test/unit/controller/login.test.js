"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Utils
const exporter_2 = require("../../../app/shared/utils/exporter");
// Service
const exporter_3 = require("../../../app/modules/service/exporter");
// Camada controller a ser testada
const exporter_4 = require("../../../app/modules/controller/exporter");
describe('Sequência de testes sobre a camada "LoginController"', () => {
    // Configurações iniciais
    const controller = new exporter_4.LoginController();
    const req = {};
    const res = {};
    let next;
    const validEmail = 'valid_email';
    const validToken = 'valid_token';
    const validPassword = 'valid_password';
    const invalidEmail = 'invalid_email';
    const invalidPassword = 'invalid_password';
    beforeEach(() => {
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn().mockReturnValue(null);
    });
    afterEach(() => { jest.clearAllMocks(); });
    test('Verifica se retorna um token em caso de sucesso da autenticação', async () => {
        req.body = { email: validEmail, password: validPassword };
        const spy = jest.spyOn(exporter_3.LoginService.prototype, 'validateUser')
            .mockResolvedValue({ token: validToken });
        await controller.login(req, res, next);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(validEmail, validPassword);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(exporter_1.httpStatus.OK);
        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ token: validToken });
    });
    test('Verifica se a função next é chamada corretamente em caso de erro', async () => {
        req.body = { email: invalidEmail, password: invalidPassword };
        const spy = jest.spyOn(exporter_3.LoginService.prototype, 'validateUser')
            .mockImplementation(async () => {
            throw new exporter_2.AuthError({
                message: exporter_1.errorMessages.USER_NOT_FOUND,
                statusCode: exporter_1.httpStatus.NOT_FOUND
            });
        });
        await controller.login(req, res, next);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(invalidEmail, invalidPassword);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.AuthError({
            message: exporter_1.errorMessages.USER_NOT_FOUND,
            statusCode: exporter_1.httpStatus.NOT_FOUND
        }));
    });
});
