"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library
const bcrypt_1 = __importDefault(require("bcrypt"));
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// Helper a ser testado
const exporter_3 = require("../../../app/shared/helpers/exporter");
describe('Sequência de testes sobre o helper "UserHelper"', () => {
    const hash = 'valid_hash';
    const userMatch = exporter_2.users.map((user) => ({
        ...user,
        passwordHash: hash,
    }));
    test('Se o método "createHashedPassword" retorna um array de hash', async () => {
        const spy = jest.spyOn(bcrypt_1.default, 'hash').mockImplementation(() => hash);
        const usersWithHash = await exporter_3.UserHelper.createHashedPassword(exporter_2.users);
        const zero = 0;
        const firstCall = 1;
        const secondCall = 2;
        const thirdCall = 3;
        expect(spy).toHaveBeenCalledTimes(exporter_2.users.length);
        expect(spy).toHaveBeenNthCalledWith(firstCall, `${exporter_2.users[zero].registry}${exporter_2.users[zero].name}${exporter_1.jwtConfig.JWT_SECRET}`, exporter_1.bcryptConfig.BCRYPT_SALT_ROUNDS);
        expect(spy).toHaveBeenNthCalledWith(secondCall, `${exporter_2.users[firstCall].registry}${exporter_2.users[firstCall].name}${exporter_1.jwtConfig.JWT_SECRET}`, exporter_1.bcryptConfig.BCRYPT_SALT_ROUNDS);
        expect(spy).toHaveBeenNthCalledWith(thirdCall, `${exporter_2.users[secondCall].registry}${exporter_2.users[secondCall].name}${exporter_1.jwtConfig.JWT_SECRET}`, exporter_1.bcryptConfig.BCRYPT_SALT_ROUNDS);
        expect(usersWithHash).toEqual(userMatch);
    });
});
