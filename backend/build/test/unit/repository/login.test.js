"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mocks
const exporter_1 = require("../../mocks/exporter");
// Model
const exporter_2 = require("../../../app/database/ORM/model/exporter");
// Repository a ser testado
const exporter_3 = require("../../../app/modules/repository/exporter");
describe('Sequência de testes para o repositório Login', () => {
    // Configurações iniciais
    const repository = new exporter_3.LoginRepository();
    afterEach(() => { jest.clearAllMocks(); });
    test('Verifica se retorna um usuário válido', async () => {
        const firstPosition = 0;
        const userMock = exporter_2.User.build(exporter_1.users[firstPosition]);
        const spy = jest.spyOn(exporter_2.User, 'findOne')
            .mockResolvedValue(Promise.resolve(userMock));
        const user = await repository.findUserByEmail(userMock.email);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({ where: { email: userMock.email } });
        expect(user).not.toBeNull();
        expect(user).toHaveProperty('hash', userMock.passwordHash);
        expect(user).toHaveProperty('email', userMock.email);
    });
    test('Verifica se retorna nulo caso não encontre o usuário', async () => {
        const spy = jest.spyOn(exporter_2.User, 'findOne').mockResolvedValue(Promise.resolve(null));
        const user = await repository.findUserByEmail('usuário inválido');
        expect(spy).toHaveBeenCalled();
        expect(user).toBeNull();
    });
});
