"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../app/SSOT/exporter");
// Mocks
const exporter_2 = require("../../mocks/exporter");
// Utilitário a ser testado
const exporter_3 = require("../../../app/shared/utils/exporter");
describe('Sequência sobre os validadores de formato de registro de novos usuários', () => {
    test('Se lança um erro caso o campo de registro "name" tenha formato inválido', () => {
        const bodyNameEmpty = exporter_2.request.bodyInvalidName;
        expect(() => exporter_3.RequestValidators.userRegisterFields(bodyNameEmpty)).toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "pcd" seja não booleano', () => {
        const bodyPcdInvalid = exporter_2.request.bodyInvalidPcd;
        expect(() => exporter_3.RequestValidators.userRegisterBooleanFields(bodyPcdInvalid))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PCD,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "ppp" seja não booleano', () => {
        const bodyPppInvalid = exporter_2.request.bodyInvalidPpp;
        expect(() => exporter_3.RequestValidators.userRegisterBooleanFields(bodyPppInvalid))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PPP,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "backupRegister" seja não booleano', () => {
        const bodyRegistryBackup = exporter_2.request.bodyInvalidBackup;
        expect(() => exporter_3.RequestValidators.userRegisterBooleanFields(bodyRegistryBackup))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_BACKUP_REGISTER,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "globalPosition" seja não numérico', () => {
        const bodyGlobalPosition = exporter_2.request.bodyInvalidGlobal;
        expect(() => exporter_3.RequestValidators.userRegisterNumberFields(bodyGlobalPosition))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_GLOBAL_POSITION,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "pcdPosition" seja não numérico', () => {
        const bodyPcdPosition = exporter_2.request.bodyInvalidPcdPosition;
        expect(() => exporter_3.RequestValidators.userRegisterNumberFields(bodyPcdPosition))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PCD_POSITION,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "pppPosition" seja não numérico', () => {
        const bodyPppPosition = exporter_2.request.bodyInvalidPppPosition;
        expect(() => exporter_3.RequestValidators.userRegisterNumberFields(bodyPppPosition))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_PPP_POSITION,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
    test('Se lança um erro caso o campo de registro "registry" seja não numérico', () => {
        const bodyRegistryInvalid = exporter_2.request.bodyInvalidRegistry;
        expect(() => exporter_3.RequestValidators.userRegisterNumberFields(bodyRegistryInvalid))
            .toThrow(new exporter_3.RequestError({
            message: exporter_1.errorMessages.INVALID_REGISTRY,
            statusCode: exporter_1.httpStatus.BAD_REQUEST,
        }));
    });
});
