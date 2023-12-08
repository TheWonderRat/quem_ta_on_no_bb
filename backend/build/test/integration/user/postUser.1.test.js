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
// Application
const app_1 = __importDefault(require("../../../app/app"));
describe('Sequência de testes sobre os middlewares da rota de usuários', () => {
    const { app } = new app_1.default();
    const path = exporter_1.pathNames.user;
    test('Se retorna BAD REQUEST(400) e mensagem de erro, caso faltem campos de registro', async () => {
        const response0 = await (0, supertest_1.default)(app).post(path).send(exporter_2.request.bodyFull);
        const response1 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyNoPcd]);
        const response2 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyNoPpp]);
        const response3 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyNoRegistry]);
        const response4 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyNoBackup]);
        const response5 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyNoGlobal]);
        const response6 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyNoName]);
        expect(response0.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response1.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response2.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response3.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response4.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response5.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response6.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response0.body).toHaveProperty('message');
        expect(response1.body).toHaveProperty('message');
        expect(response2.body).toHaveProperty('message');
        expect(response3.body).toHaveProperty('message');
        expect(response4.body).toHaveProperty('message');
        expect(response5.body).toHaveProperty('message');
        expect(response6.body).toHaveProperty('message');
        expect(response0.body.message).toBe(exporter_1.errorMessages.INVALID_FORMAT_REGISTER);
        expect(response1.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
        expect(response2.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
        expect(response3.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
        expect(response4.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
        expect(response5.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
        expect(response6.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
    });
    test('Se retorna BAD REQUEST(400) e mensagem de erro, caso o algum dos campos tenha formato inválido', async () => {
        const response0 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidName]);
        const response1 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidPcd]);
        const response2 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidPpp]);
        const response3 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidBackup]);
        const response4 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidGlobal]);
        const response5 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidPcdPosition]);
        const response6 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidPppPosition]);
        const response7 = await (0, supertest_1.default)(app).post(path).send([exporter_2.request.bodyInvalidRegistry]);
        expect(response0.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response1.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response2.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response3.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response4.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response5.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response6.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response7.status).toBe(exporter_1.httpStatus.BAD_REQUEST);
        expect(response0.body).toHaveProperty('message');
        expect(response1.body).toHaveProperty('message');
        expect(response2.body).toHaveProperty('message');
        expect(response3.body).toHaveProperty('message');
        expect(response4.body).toHaveProperty('message');
        expect(response5.body).toHaveProperty('message');
        expect(response6.body).toHaveProperty('message');
        expect(response7.body).toHaveProperty('message');
        expect(response0.body.message).toBe(exporter_1.errorMessages.MISSING_FIELD_REGISTER);
        expect(response1.body.message).toBe(exporter_1.errorMessages.INVALID_PCD);
        expect(response2.body.message).toBe(exporter_1.errorMessages.INVALID_PPP);
        expect(response3.body.message).toBe(exporter_1.errorMessages.INVALID_BACKUP_REGISTER);
        expect(response4.body.message).toBe(exporter_1.errorMessages.INVALID_GLOBAL_POSITION);
        expect(response5.body.message).toBe(exporter_1.errorMessages.INVALID_PCD_POSITION);
        expect(response6.body.message).toBe(exporter_1.errorMessages.INVALID_PPP_POSITION);
        expect(response7.body.message).toBe(exporter_1.errorMessages.INVALID_REGISTRY);
    });
});
