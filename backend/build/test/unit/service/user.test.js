"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Utils
const exporter_2 = require("../../../app/shared/utils/exporter");
// Mocks
const exporter_3 = require("../../mocks/exporter");
// Repository
const exporter_4 = require("../../../app/modules/repository/exporter");
// Camada service a ser testada
const exporter_5 = require("../../../app/modules/service/exporter");
describe('Sequência de testes para o serviço User', () => {
    // Configurações iniciais
    const service = new exporter_5.UserService();
    const fakeUsersIds = exporter_3.users
        .map(({ id, registry }) => ({ id, registry }));
    afterEach(() => { jest.clearAllMocks(); });
    test('Se o método "createUsers" retorna um UUID', async () => {
        const spyRepository = jest.spyOn(exporter_4.UserRepository.prototype, 'populateUsers')
            .mockResolvedValue(fakeUsersIds);
        const newUser = await service.createUsers(exporter_3.users);
        expect(spyRepository).toHaveBeenCalled();
        expect(spyRepository).toHaveBeenCalledWith(exporter_3.users);
        expect(newUser).toEqual(fakeUsersIds);
    });
    test('Se o método "createUsers" lança um caso em caso de erro no cadastro', async () => {
        jest.spyOn(exporter_4.UserRepository.prototype, 'populateUsers')
            .mockResolvedValue(false);
        return expect(service.createUsers(exporter_3.users)).rejects.toThrow(exporter_2.ServerError);
    });
    test('Se o método "createUsers" lança o erro com as informações corretas', async () => {
        const spy = jest.spyOn(exporter_4.UserRepository.prototype, 'populateUsers')
            .mockResolvedValue(false);
        try {
            await service.createUsers(exporter_3.users);
        }
        catch (error) {
            expect(spy).toHaveBeenCalled();
            expect(error).toEqual(new exporter_2.ServerError({
                message: exporter_1.errorMessages.DATABASE_NOT_FOUND,
                statusCode: exporter_1.httpStatus.NOT_FOUND,
            }));
        }
    });
});
