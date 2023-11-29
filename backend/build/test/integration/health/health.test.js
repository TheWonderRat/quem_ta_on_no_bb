"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library
const supertest_1 = __importDefault(require("supertest"));
// App
const app_1 = __importDefault(require("../../../app/app"));
describe('Sequência de testes para rota "/health"', () => {
    const OK = 200;
    const { app } = new app_1.default();
    const PATH = '/health';
    test('Verifica se retorna status OK e resposta adequada', async () => {
        const response = await (0, supertest_1.default)(app).get(PATH);
        expect(response.status).toBe(OK);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/^Rota funcionando normalmente$/);
    });
});
