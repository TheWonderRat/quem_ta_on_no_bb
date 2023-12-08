"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// Errors
const exporter_3 = require("../../../app/shared/utils/exporter");
// Middleware
const exporter_4 = require("../../../app/middlewares/exporter");
describe('Sequência de testes sobre o middleware User', () => {
    // Configurações iniciais
    const req = {};
    const res = {};
    let next;
    let fullBody = structuredClone(exporter_2.request.bodyFull);
    beforeEach(() => {
        const restoreFullBody = structuredClone(exporter_2.request.bodyFull);
        fullBody = restoreFullBody;
        next = jest.fn().mockReturnValue(null);
    });
    test('Se o middleware valida corretamente os corpo básico da requisição', () => {
        req.body = [fullBody];
        exporter_4.UserMid.validateFormat(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    test('Se o middleware retorna erro caso o corpo da requisição não seja um array', () => {
        req.body = fullBody;
        exporter_4.UserMid.validateFormat(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_FORMAT_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
