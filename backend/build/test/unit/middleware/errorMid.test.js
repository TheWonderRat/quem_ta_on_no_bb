"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Errors
const exporter_2 = require("../../../app/shared/utils/exporter");
// Middleware
const exporter_3 = require("../../../app/middlewares/exporter");
describe('Sequência de testes sobre o middleware de erros', () => {
    // Configurações iniciais
    const req = {};
    const res = {};
    let next;
    beforeEach(() => {
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
    });
    afterEach(() => { jest.clearAllMocks(); });
    test('Se o método "errorHandler" retorna o status e a mensagem dos erros customizados', () => {
        const error = new exporter_2.RequestError({
            message: exporter_1.errorMessages.MISSING_TOKEN,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        });
        exporter_3.ErrorMid.errorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(error.errorInfo.statusCode);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: error.errorInfo.message });
    });
    test('Se o método "errorHandler" retorna o status e a mensagem de erros genéricos', () => {
        const error = new Error('Erro genérico');
        exporter_3.ErrorMid.errorHandler(error, req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(exporter_1.httpStatus.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: exporter_1.errorMessages.SERVER_SIDE_ERROR });
    });
});
