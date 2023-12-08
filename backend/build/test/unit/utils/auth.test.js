"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Utilitário a ser testado
const exporter_2 = require("../../../app/shared/utils/exporter");
describe('Sequência sobre os validadores de token', () => {
    test('Se lança um erro caso o campo authorization não seja enviado', () => {
        const headers = {};
        expect(() => exporter_2.RequestValidators.authorizationField(headers)).toThrow(new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_TOKEN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
