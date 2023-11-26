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
    const randomNumber = 34;
    let fullBody = structuredClone(exporter_2.request.bodyFull);
    beforeEach(() => {
        const restoreFullBody = structuredClone(exporter_2.request.bodyFull);
        fullBody = restoreFullBody;
        next = jest.fn().mockReturnValue(null);
    });
    test('Verifica se o middleware valida corretamente os campos de usuário', () => {
        req.body = [fullBody];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    test('Se o middleware lança um erro quando algum campo está ausente', () => {
        const bodyOptions = [
            [exporter_2.request.bodyNoName], [exporter_2.request.bodyNoPcd],
            [exporter_2.request.bodyNoPpp], [exporter_2.request.bodyNoRegistry],
            [exporter_2.request.bodyNoBackup], [exporter_2.request.bodyNoGlobal],
        ];
        bodyOptions.forEach((body, index) => {
            const one = 1;
            req.body = body;
            exporter_4.UserMid.validateUserFields(req, res, next);
            expect(next).toHaveBeenCalledTimes(index + one);
            expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
                message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            }));
        });
    });
    test('Verifica se o middleware lança um erro quando o campo "nome" é enviado vazio', () => {
        const bodyEmptyName = fullBody;
        bodyEmptyName.name = '';
        req.body = [bodyEmptyName];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "register" é enviado com valor não numérico', () => {
        const bodyRegisterNoNumber = fullBody;
        bodyRegisterNoNumber.registry = 'no_number';
        req.body = [bodyRegisterNoNumber];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_REGISTRY,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "globalPosition" é enviado com valor não numérico', () => {
        const bodyGlobalPositionNoNumber = fullBody;
        bodyGlobalPositionNoNumber.globalPosition = 'no_number';
        req.body = [bodyGlobalPositionNoNumber];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_GLOBAL_POSITION,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "pcdPosition" é enviado com valor não numérico', () => {
        const bodyPcdPositionNoNumber = fullBody;
        bodyPcdPositionNoNumber.pcdPosition = 'no_number';
        req.body = [bodyPcdPositionNoNumber];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PCD_POSITION,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "pppPosition" é enviado com valor não numérico', () => {
        const bodyPppPositionNoNumber = fullBody;
        bodyPppPositionNoNumber.pppPosition = 'no_number';
        req.body = [bodyPppPositionNoNumber];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PPP_POSITION,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "PCD" não for booleano', () => {
        const bodyPcdNoBool = fullBody;
        bodyPcdNoBool.pcd = randomNumber;
        req.body = [bodyPcdNoBool];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PCD,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "PPP" não for booleano', () => {
        const bodyPppNoBool = fullBody;
        bodyPppNoBool.ppp = randomNumber;
        req.body = [bodyPppNoBool];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PPP,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se o middleware lança um erro quando o campo "backupRegister" não for booleano', () => {
        const bodyPppNoBool = fullBody;
        bodyPppNoBool.backupRegister = randomNumber;
        req.body = [bodyPppNoBool];
        exporter_4.UserMid.validateUserFields(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_BACKUP_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
