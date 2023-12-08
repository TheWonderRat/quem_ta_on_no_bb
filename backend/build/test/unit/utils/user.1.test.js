"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// Utilitário a ser testado
const exporter_3 = require("../../../app/shared/utils/exporter");
describe('Sequência sobre os validadores de campos de registro de novos usuários', () => {
    test('Se lança um erro caso o formato fornecido não seja um array', () => {
        expect(() => exporter_3.RequestValidators.arrayValidator({})).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_FORMAT_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso seja enviados um corpo vazio', () => {
        const bodyEmpty = {};
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyEmpty)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo "name" não seja enviado', () => {
        const bodyWithoutName = exporter_2.request.bodyNoName;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyWithoutName)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo "pcd" não seja enviado', () => {
        const bodyWithoutPcd = exporter_2.request.bodyNoPcd;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyWithoutPcd)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo "ppp" não seja enviado', () => {
        const bodyWithoutPpp = exporter_2.request.bodyNoPpp;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyWithoutPpp)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo "registry" não seja enviado', () => {
        const bodyWithoutRegistry = exporter_2.request.bodyNoRegistry;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyWithoutRegistry)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo "backupRegister" não seja enviado', () => {
        const bodyWithoutBackup = exporter_2.request.bodyNoBackup;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyWithoutBackup)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo "globalPosition" não seja enviado', () => {
        const bodyWithoutGlobal = exporter_2.request.bodyNoGlobal;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyWithoutGlobal)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
