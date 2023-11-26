"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library
const bcrypt_1 = __importDefault(require("bcrypt"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// model
const exporter_3 = require("../../../app/database/ORM/model/exporter");
// Application
const app_1 = __importDefault(require("../../../app/app"));
describe('Sequência de testes na rota de login', () => {
    const { app } = new app_1.default();
    const path = exporter_1.pathNames.login;
    const firstPosition = 0;
    const validEmail = 'valid_email@email.com';
    const validToken = 'valid_token';
    const validPassword = 'valid_password';
    const invalidEmail = 'invalid_email@email.com';
    const invalidPassword = 'invalid_password';
    const invalidEmailFormat = 'invalid_email_format';
    const validLoginInfo = { email: validEmail, password: validPassword };
    const invalidLoginInfo = { email: invalidEmail, password: invalidPassword };
    afterEach(() => { jest.clearAllMocks(); });
    test('Se retorna BAD REQUEST(400) e mensagem de erro, caso faltem informações de login', async () => {
        const response = await (0, supertest_1.default)(app).post(path).send({ email: validEmail });
        expect(response.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_LOGIN);
        const response2 = await (0, supertest_1.default)(app).post(path).send({ password: validPassword });
        expect(response2.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response2.body).toHaveProperty('message');
        expect(response2.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_LOGIN);
        const response3 = await (0, supertest_1.default)(app).post(path).send({ email: '', password: validPassword });
        expect(response3.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response3.body).toHaveProperty('message');
        expect(response3.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_LOGIN);
        const response4 = await (0, supertest_1.default)(app).post(path).send({ email: validEmail, password: '' });
        expect(response4.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response4.body).toHaveProperty('message');
        expect(response4.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_LOGIN);
    });
    test('Se retorna BAD REQUEST(400) e mensagem de erro, caso o email tenha formato inválido', async () => {
        const response = await (0, supertest_1.default)(app)
            .post(path)
            .send({ email: invalidEmailFormat, password: validPassword });
        expect(response.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(exporter_1.errorMessages.INVALID_EMAIL);
    });
    test('Se retorna OK(200) e um token em caso de sucesso', async () => {
        const fakeUser = exporter_3.User.build(exporter_2.users[firstPosition]);
        const spyModel = jest.spyOn(exporter_3.User, 'findOne')
            .mockImplementation(async () => Promise.resolve(fakeUser));
        const spyBcrypt = jest.spyOn(bcrypt_1.default, 'compare')
            .mockImplementation(async () => Promise.resolve(true));
        const spyJsonwebtoken = jest.spyOn(jsonwebtoken_1.default, 'sign')
            .mockImplementation(() => validToken);
        const response = await (0, supertest_1.default)(app).post(path).send(validLoginInfo);
        expect(spyModel).toHaveBeenCalled();
        expect(spyModel).toHaveBeenCalledWith({ where: { email: validEmail } });
        expect(spyBcrypt).toHaveBeenCalled();
        expect(spyBcrypt).toHaveBeenCalledWith(validPassword, fakeUser.passwordHash);
        expect(spyJsonwebtoken).toHaveBeenCalled();
        expect(spyJsonwebtoken).toHaveBeenCalledWith({ email: fakeUser.email, password: fakeUser.passwordHash }, exporter_1.jwtConfig.JWT_SECRET, exporter_1.jwtConfig.JWT_SIGN_OPTIONS);
        expect(response.status).toBe(exporter_1.httpStatus.OK);
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toBe(validToken);
    });
    test('Se retorna NOT FOUND(404) e mensagem de erro em caso não encontre o usuário', async () => {
        const spyModel = jest.spyOn(exporter_3.User, 'findOne').mockImplementation(async () => Promise.resolve(null));
        const response = await (0, supertest_1.default)(app).post(path).send(invalidLoginInfo);
        expect(spyModel).toHaveBeenCalled();
        expect(spyModel).toHaveBeenCalledWith({ where: { email: invalidEmail } });
        expect(response.status).toBe(exporter_1.httpStatus.NOT_FOUND);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(exporter_1.errorMessages.USER_NOT_FOUND);
    });
    test('Se retorna UNAUTHORIZED(401) e mensagem de erro em caso senha incorreta', async () => {
        const fakeUser = exporter_3.User.build(exporter_2.users[firstPosition]);
        const spyModel = jest.spyOn(exporter_3.User, 'findOne')
            .mockImplementation(async () => Promise.resolve(fakeUser));
        const spyBcrypt = jest.spyOn(bcrypt_1.default, 'compare')
            .mockImplementation(async () => Promise.resolve(false));
        const response = await (0, supertest_1.default)(app).post(path).send(invalidLoginInfo);
        expect(spyModel).toHaveBeenCalled();
        expect(spyModel).toHaveBeenCalledWith({ where: { email: invalidEmail } });
        expect(spyBcrypt).toHaveBeenCalled();
        expect(spyBcrypt).toHaveBeenCalledWith(invalidPassword, fakeUser.passwordHash);
        expect(response.status).toBe(exporter_1.httpStatus.UNAUTHORIZED);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(exporter_1.errorMessages.MISS_MATCHED_PASSWORD);
    });
});
