"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library
const supertest_1 = __importDefault(require("supertest"));
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// model
const exporter_3 = require("../../../app/database/ORM/model/exporter");
// Sequelize
const connection_1 = __importDefault(require("../../../app/database/ORM/connection"));
// Application
const app_1 = __importDefault(require("../../../app/app"));
describe('Sequência de testes sobre para os casos de erro da rota de usuários', () => {
    const { app } = new app_1.default();
    const path = exporter_1.pathNames.user;
    const transaction = {};
    beforeEach(() => {
        transaction.commit = jest.fn();
        transaction.rollback = jest.fn();
    });
    afterEach(() => { jest.clearAllMocks(); });
    test('Se retorna NOT FOUND(404) e mensagem de erro, caso não seja possível acessar o banco de dados', async () => {
        const spySequelize = jest.spyOn(connection_1.default, 'transaction').mockResolvedValue(transaction);
        const spyModel = jest.spyOn(exporter_3.User, 'bulkCreate')
            .mockRejectedValue(new Error());
        const response = await (0, supertest_1.default)(app).post(path).send(exporter_2.users);
        expect(spyModel).toHaveBeenCalled();
        expect(spySequelize).toHaveBeenCalled();
        expect(transaction.commit).not.toHaveBeenCalled();
        expect(transaction.rollback).toHaveBeenCalled();
        expect(response.status).toBe(exporter_1.httpStatus.NOT_FOUND);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(exporter_1.errorMessages.DATABASE_NOT_FOUND);
    });
});
