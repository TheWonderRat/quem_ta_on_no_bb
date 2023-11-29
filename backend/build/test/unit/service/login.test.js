"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// utils
const exporter_2 = require("../../../app/shared/utils/exporter");
// Repository
const exporter_3 = require("../../../app/modules/repository/exporter");
// Camada service a ser testada
const exporter_4 = require("../../../app/modules/service/exporter");
describe('Sequência de testes para o serviço Login', () => {
    // Configurações iniciais
    const service = new exporter_4.LoginService();
    const validEmail = 'valid_email';
    const validHash = 'valid_hash';
    const validPassword = 'valid_password';
    const invalidEmail = 'invalid_email';
    const invalidPassword = 'invalid_password';
    afterEach(() => { jest.clearAllMocks(); });
    test('Se o método "validateUser" retorna um token válido', async () => {
        const spyJwt = jest.spyOn(jsonwebtoken_1.default, 'sign').mockImplementation(() => 'valid_token');
        const spyBcrypt = jest.spyOn(bcrypt_1.default, 'compare')
            .mockImplementation(async () => Promise.resolve(true));
        const spyRepository = jest.spyOn(exporter_3.LoginRepository.prototype, 'findUserByEmail')
            .mockResolvedValue({ email: validEmail, hash: validHash });
        const token = await service.validateUser(validEmail, validPassword);
        expect(spyRepository).toHaveBeenCalled();
        expect(spyRepository).toHaveBeenCalledWith(validEmail);
        expect(spyBcrypt).toHaveBeenCalled();
        expect(spyBcrypt).toHaveBeenCalledWith(validPassword, validHash);
        expect(spyJwt).toHaveBeenCalled();
        expect(spyJwt).toHaveBeenCalledWith({ email: validEmail, password: validHash }, exporter_1.jwtConfig.JWT_SECRET, exporter_1.jwtConfig.JWT_SIGN_OPTIONS);
        expect(token).toHaveProperty('token');
        expect(token.token).toMatch(/^valid_token$/);
    });
    test('Se o método "validateUser" retorna um erro quando o usuário não é encontrado', async () => {
        jest.spyOn(exporter_3.LoginRepository.prototype, 'findUserByEmail')
            .mockResolvedValue(null);
        return expect(service.validateUser(invalidEmail, validPassword)).rejects.toThrow(exporter_2.AuthError);
    });
    test('Se o método "validateUser" retorna um erro quando a senha não confere', async () => {
        jest.spyOn(exporter_3.LoginRepository.prototype, 'findUserByEmail')
            .mockResolvedValue({ email: validEmail, hash: validHash });
        jest.spyOn(bcrypt_1.default, 'compare').mockImplementation(async () => Promise.resolve(false));
        return expect(service.validateUser(validEmail, invalidPassword)).rejects.toThrow(exporter_2.AuthError);
    });
    test('Verifica a mensagem de erro quando o usuário não é encontrado', async () => {
        const spyRepository = jest.spyOn(exporter_3.LoginRepository.prototype, 'findUserByEmail')
            .mockResolvedValue(null);
        try {
            await service.validateUser(invalidEmail, validPassword);
        }
        catch (e) {
            expect(e).toHaveProperty('errorInfo');
            const error = e;
            expect(error.errorInfo).toHaveProperty('message');
            expect(error.errorInfo).toHaveProperty('statusCode');
            expect(error.errorInfo.message).toMatch(exporter_1.errorMessages.USER_NOT_FOUND);
            expect(error.errorInfo.statusCode).toBe(exporter_1.httpStatus.NOT_FOUND);
        }
        expect(spyRepository).toHaveBeenCalled();
        expect(spyRepository).toHaveBeenCalledWith(invalidEmail);
    });
    test('Verifica a mensagem de erro quando a senha não confere', async () => {
        const spyBcrypt = jest.spyOn(bcrypt_1.default, 'compare')
            .mockImplementation(async () => Promise.resolve(false));
        const spyRepository = jest.spyOn(exporter_3.LoginRepository.prototype, 'findUserByEmail')
            .mockResolvedValue({ email: validEmail, hash: validHash });
        try {
            await service.validateUser(validEmail, invalidPassword);
        }
        catch (e) {
            expect(e).toEqual(new exporter_2.AuthError({
                message: exporter_1.errorMessages.MISS_MATCHED_PASSWORD,
                statusCode: exporter_1.httpStatus.UNAUTHORIZED,
            }));
        }
        expect(spyRepository).toHaveBeenCalled();
        expect(spyRepository).toHaveBeenCalledWith(validEmail);
        expect(spyBcrypt).toHaveBeenCalled();
        expect(spyBcrypt).toHaveBeenCalledWith(invalidPassword, validHash);
    });
});
