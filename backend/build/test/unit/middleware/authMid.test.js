"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Errors
const exporter_2 = require("../../../app/shared/utils/exporter");
// Middleware
const exporter_3 = require("../../../app/middlewares/exporter");
describe('Sequência de testes sobre o middleware de autenticação', () => {
    // Configurações iniciais
    const req = {};
    const res = {};
    let next;
    beforeEach(() => { next = jest.fn().mockReturnValue(null); });
    afterEach(() => { jest.clearAllMocks(); });
    test('Verifica se o método "hasToken" valida corretamente a existência do token', () => {
        req.headers = { authorization: 'Bearer token' };
        exporter_3.AuthMid.hasToken(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    test('Verifica se o método "hasToken" retorna um erro quando o token não existe', () => {
        req.headers = {};
        exporter_3.AuthMid.hasToken(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_TOKEN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Verifica se o método "hasValidToken" valida corretamente o token', () => {
        const validToken = 'valid_token';
        req.headers = { authorization: `Bearer ${validToken}` };
        const verifySpy = jest.spyOn(jsonwebtoken_1.default, 'verify').mockImplementation(() => null);
        exporter_3.AuthMid.hasValidToken(req, res, next);
        expect(verifySpy).toHaveBeenCalled();
        expect(verifySpy).toHaveBeenCalledWith(validToken, exporter_1.jwtConfig.JWT_SECRET);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    test('Verifica se o método "hasValidToken" retorna um erro quando o token não é válido', () => {
        const invalidToken = 'invalid_token';
        req.headers = { authorization: `Bearer ${invalidToken}` };
        const verifySpy = jest.spyOn(jsonwebtoken_1.default, 'verify').mockImplementation(() => {
            throw new exporter_2.AuthError({
                message: exporter_1.errorMessages.USER_NOT_AUTHENTICATED,
                statusCode: exporter_1.httpStatus.UNAUTHORIZED,
            });
        });
        exporter_3.AuthMid.hasValidToken(req, res, next);
        expect(verifySpy).toHaveBeenCalled();
        expect(verifySpy).toHaveBeenCalledWith(invalidToken, exporter_1.jwtConfig.JWT_SECRET);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_2.AuthError({
            message: exporter_1.errorMessages.USER_NOT_AUTHENTICATED,
            statusCode: exporter_1.httpStatus.UNAUTHORIZED,
        }));
    });
});
