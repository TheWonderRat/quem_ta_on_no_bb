"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries
const bcrypt_1 = __importDefault(require("bcrypt"));
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// Utils
const exporter_3 = require("../../../app/shared/utils/exporter");
// Service
const exporter_4 = require("../../../app/modules/service/exporter");
// Camada controller a ser testada
const exporter_5 = require("../../../app/modules/controller/exporter");
describe('Sequência de testes sobre a camada "UserController"', () => {
    // Configurações iniciais
    const controller = new exporter_5.UserController();
    const req = {};
    const res = {};
    let next;
    beforeEach(() => {
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn().mockReturnValue(null);
    });
    afterEach(() => { jest.clearAllMocks(); });
    const validUuid = 'valid_uuid';
    const firstPosition = 0;
    const secondPosition = 1;
    const newUsers = [
        {
            name: exporter_2.users[firstPosition].name,
            pcd: exporter_2.users[firstPosition].pcd,
            ppp: exporter_2.users[firstPosition].ppp,
            registry: exporter_2.users[firstPosition].registry,
            backupRegister: false,
            globalPosition: exporter_2.users[firstPosition].globalPosition,
        },
        {
            name: exporter_2.users[secondPosition].name,
            pcd: exporter_2.users[secondPosition].pcd,
            ppp: exporter_2.users[secondPosition].ppp,
            registry: exporter_2.users[secondPosition].registry,
            backupRegister: false,
            globalPosition: exporter_2.users[secondPosition].globalPosition,
        },
    ];
    const usersWithHash = newUsers
        .map((newUser) => ({ ...newUser, passwordHash: 'hash' }));
    test('Se o método "registerUser" retorna um id e a matrícula em caso de sucesso', async () => {
        const expectedResponse = [
            { id: validUuid, registry: exporter_2.users[firstPosition].registry },
            { id: validUuid, registry: exporter_2.users[secondPosition].registry },
        ];
        const spyBcrypt = jest.spyOn(bcrypt_1.default, 'hash').mockImplementation(async () => 'hash');
        const spyService = jest.spyOn(exporter_4.UserService.prototype, 'createUsers')
            .mockImplementation(async () => (expectedResponse));
        req.body = newUsers;
        const numberOfCalls = 2;
        const firstCall = 1;
        const secondCall = 2;
        await controller.registerUsers(req, res, next);
        expect(spyBcrypt).toHaveBeenCalledTimes(numberOfCalls);
        expect(spyBcrypt).toHaveBeenNthCalledWith(firstCall, `${exporter_2.users[firstPosition].registry}${exporter_2.users[firstPosition].name}${exporter_1.jwtConfig.JWT_SECRET}`, exporter_1.bcryptConfig.BCRYPT_SALT_ROUNDS);
        expect(spyBcrypt).toHaveBeenNthCalledWith(secondCall, `${exporter_2.users[secondPosition].registry}${exporter_2.users[secondPosition].name}${exporter_1.jwtConfig.JWT_SECRET}`, exporter_1.bcryptConfig.BCRYPT_SALT_ROUNDS);
        expect(spyService).toHaveBeenCalled();
        expect(spyService).toHaveBeenCalledWith(usersWithHash);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(exporter_1.httpStatus.CREATED);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResponse);
    });
    test('Se o método "registerUser" chama o "next" com o erro em caso de falha', async () => {
        const spyBcrypt = jest.spyOn(bcrypt_1.default, 'hash').mockImplementation(async () => 'hash');
        const spyService = jest.spyOn(exporter_4.UserService.prototype, 'createUsers')
            .mockImplementation(async () => {
            throw new exporter_3.ServerError({
                message: exporter_1.errorMessages.DATABASE_NOT_FOUND,
                statusCode: exporter_1.httpStatus.NOT_FOUND,
            });
        });
        req.body = newUsers;
        await controller.registerUsers(req, res, next);
        expect(spyBcrypt).toHaveBeenCalled();
        expect(spyService).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.ServerError({
            message: exporter_1.errorMessages.DATABASE_NOT_FOUND,
            statusCode: exporter_1.httpStatus.NOT_FOUND,
        }));
    });
});
