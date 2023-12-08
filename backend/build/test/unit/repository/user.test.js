"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Mocks
const exporter_1 = require("../../mocks/exporter");
// Model
const exporter_2 = require("../../../app/database/ORM/model/exporter");
const connection_1 = __importDefault(require("../../../app/database/ORM/connection"));
// Repository a ser testado
const exporter_3 = require("../../../app/modules/repository/exporter");
describe('Sequência de testes para o repositório User', () => {
    // Configurações iniciais
    const repository = new exporter_3.UserRepository();
    const transaction = {};
    let spySequelize;
    const newUsers = exporter_1.users
        .map((newUser) => ({
        pcd: newUser.pcd,
        ppp: newUser.ppp,
        name: newUser.name,
        registry: newUser.registry,
        passwordHash: newUser.passwordHash,
        backupRegister: newUser.backupRegister,
        globalPosition: newUser.globalPosition,
        pcdPosition: newUser.pcdPosition,
        pppPosition: newUser.pppPosition,
    }));
    beforeEach(() => {
        transaction.commit = jest.fn();
        transaction.rollback = jest.fn();
        spySequelize = jest.spyOn(connection_1.default, 'transaction')
            .mockResolvedValue(Promise.resolve(transaction));
    });
    afterEach(() => { jest.clearAllMocks(); });
    test('Verifica se é possível cadastrar um novo usuário com sucesso', async () => {
        const usersMock = exporter_2.User.bulkBuild(newUsers);
        const newPppIds = [];
        const newPcdIds = [];
        const newUsersIds = usersMock
            .map(({ id, registry }) => {
            const { pcd, ppp, pcdPosition, pppPosition, globalPosition } = exporter_1.users
                .find((user) => user.registry === registry);
            if (pcd) {
                newPcdIds.push({ userId: id, position: pcdPosition });
            }
            if (ppp) {
                newPppIds.push({ userId: id, position: pppPosition });
            }
            return { userId: id, position: globalPosition };
        });
        const globalRankingMock = exporter_2.GlobalRanking.bulkBuild(newUsersIds);
        const pcdRankingMock = exporter_2.PcdRanking.bulkBuild(newPcdIds);
        const pppRankingMock = exporter_2.PppRanking.bulkBuild(newPppIds);
        const spyUser = jest.spyOn(exporter_2.User, 'bulkCreate')
            .mockResolvedValue(Promise.resolve(usersMock));
        const spyGlobalRanking = jest.spyOn(exporter_2.GlobalRanking, 'bulkCreate')
            .mockResolvedValue(Promise.resolve(globalRankingMock));
        const spyPcdRanking = jest.spyOn(exporter_2.PcdRanking, 'bulkCreate')
            .mockResolvedValue(Promise.resolve(pcdRankingMock));
        const spyPppRanking = jest.spyOn(exporter_2.PppRanking, 'bulkCreate')
            .mockResolvedValue(Promise.resolve(pppRankingMock));
        const usersRegisters = await repository.populateUsers(newUsers);
        expect(spySequelize).toHaveBeenCalled();
        expect(spySequelize).toHaveBeenCalledWith();
        expect(transaction.commit).toHaveBeenCalled();
        expect(transaction.rollback).not.toHaveBeenCalled();
        expect(spyUser).toHaveBeenCalled();
        expect(spyUser).toHaveBeenCalledWith(newUsers, { transaction });
        expect(spyGlobalRanking).toHaveBeenCalled();
        expect(spyGlobalRanking).toHaveBeenCalledWith(newUsersIds, { transaction });
        expect(spyPcdRanking).toHaveBeenCalled();
        expect(spyPcdRanking).toHaveBeenCalledWith(newPcdIds, { transaction });
        expect(spyPppRanking).toHaveBeenCalled();
        expect(spyPppRanking).toHaveBeenCalledWith(newPppIds, { transaction });
        usersRegisters.forEach((eachUser) => {
            expect(eachUser).not.toBeNull();
            expect(eachUser).toHaveProperty('id', eachUser.id);
            expect(eachUser).toHaveProperty('registry', eachUser.registry);
        });
    });
    test('Verifica se ocorrer um erro no cadastro a operação é desfeita', async () => {
        const spyUser = jest.spyOn(exporter_2.User, 'bulkCreate')
            .mockImplementation(() => { throw new Error('Erro ao cadastrar usuário'); });
        const usersRegisters = await repository.populateUsers(newUsers);
        expect(spySequelize).toHaveBeenCalled();
        expect(spySequelize).toHaveBeenCalledWith();
        expect(transaction.commit).not.toHaveBeenCalled();
        expect(transaction.rollback).toHaveBeenCalled();
        expect(spyUser).toHaveBeenCalled();
        expect(spyUser).toHaveBeenCalledWith(newUsers, { transaction });
        expect(usersRegisters).toBe(false);
    });
});
