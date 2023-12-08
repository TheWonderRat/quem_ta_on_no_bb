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
describe('Sequência de testes sobre para os casos de sucesso da rota de usuários', () => {
    const { app } = new app_1.default();
    const path = exporter_1.pathNames.user;
    const newUsers = exporter_2.users.map((user) => ({
        pcd: user.pcd,
        ppp: user.ppp,
        name: user.name,
        registry: user.registry,
        backupRegister: user.backupRegister,
        pcdPosition: user.pcdPosition,
        pppPosition: user.pppPosition,
        globalPosition: user.globalPosition,
    }));
    const transaction = {};
    beforeEach(() => {
        transaction.commit = jest.fn();
        transaction.rollback = jest.fn();
    });
    afterEach(() => { jest.clearAllMocks(); });
    test('Se retorna CREATED(201) e retorne os id`s', async () => {
        const fakeUsers = exporter_3.User.bulkBuild(exporter_2.users);
        const ids = fakeUsers.map(({ id, registry }) => ({ id, registry }));
        const spySequelize = jest.spyOn(connection_1.default, 'transaction').mockResolvedValue(transaction);
        const spyUserModel = jest.spyOn(exporter_3.User, 'bulkCreate')
            .mockResolvedValue(fakeUsers);
        const spyGlobalRankingModel = jest.spyOn(exporter_3.GlobalRanking, 'bulkCreate')
            .mockResolvedValue(fakeUsers);
        const spyPcdRankingModel = jest.spyOn(exporter_3.PcdRanking, 'bulkCreate')
            .mockResolvedValue(fakeUsers);
        const spyPppRankingModel = jest.spyOn(exporter_3.PppRanking, 'bulkCreate')
            .mockResolvedValue(fakeUsers);
        const response = await (0, supertest_1.default)(app).post(path).send(newUsers);
        expect(spyUserModel).toHaveBeenCalled();
        expect(spySequelize).toHaveBeenCalled();
        expect(spyPcdRankingModel).toHaveBeenCalled();
        expect(spyPppRankingModel).toHaveBeenCalled();
        expect(spyGlobalRankingModel).toHaveBeenCalled();
        expect(transaction.commit).toHaveBeenCalled();
        expect(transaction.rollback).not.toHaveBeenCalled();
        expect(response.status).toBe(exporter_1.httpStatus.CREATED);
        expect(response.body).toEqual(ids);
    });
});
