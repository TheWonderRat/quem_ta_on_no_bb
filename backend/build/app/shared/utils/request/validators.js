"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../../../SSOT/exporter");
// Error
const requestError_1 = __importDefault(require("../error/requestError"));
// helpers
const exporter_2 = require("../../helpers/exporter");
class Validators {
    // Format validators
    static arrayValidator(body) {
        if (!Array.isArray(body)) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_FORMAT_REGISTER,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
    }
    // fields validators
    static loginFields(body) {
        ['password', 'email'].forEach((field) => {
            if (!exporter_2.RequestChecks.checkKeys(body, field)) {
                throw new requestError_1.default({
                    message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
                    statusCode: exporter_1.httpStatus.BAD_REQUEST,
                });
            }
            if (exporter_2.RequestChecks.isEmpty(body[field])) {
                throw new requestError_1.default({
                    message: exporter_1.errorMessages.MISSING_FIELD_LOGIN,
                    statusCode: exporter_1.httpStatus.BAD_REQUEST,
                });
            }
        });
    }
    static userRegisterFields(body) {
        const mandatoryFields = [
            'pcd', 'ppp', 'name', 'registry',
            'backupRegister', 'globalPosition',
        ];
        mandatoryFields.forEach((field) => {
            if (!exporter_2.RequestChecks.checkKeys(body, field)) {
                throw new requestError_1.default({
                    message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
                    statusCode: exporter_1.httpStatus.BAD_REQUEST,
                });
            }
        });
        if (exporter_2.RequestChecks.isEmpty(body.name)) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.MISSING_FIELD_REGISTER,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
    }
    static userRegisterBooleanFields(body) {
        if (typeof body.pcd !== 'boolean') {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_PCD,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
        if (typeof body.ppp !== 'boolean') {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_PPP,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
        if (typeof body.backupRegister !== 'boolean') {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_BACKUP_REGISTER,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
    }
    static userRegisterNumberFields(body) {
        if (!exporter_2.RequestChecks.checkOnlyNumbers(body.registry.toString())) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_REGISTRY,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
        if (!exporter_2.RequestChecks.checkOnlyNumbers(body.globalPosition.toString())) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_GLOBAL_POSITION,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
        if (body.pcdPosition && !exporter_2.RequestChecks.checkOnlyNumbers(body.pcdPosition.toString())) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_PCD_POSITION,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
        if (body.pppPosition && !exporter_2.RequestChecks.checkOnlyNumbers(body.pppPosition.toString())) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_PPP_POSITION,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
    }
    static authorizationField(headers) {
        if (!exporter_2.RequestChecks.checkKeys(headers, 'authorization')) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.MISSING_TOKEN,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
    }
    // values validators
    // public static validateId(id: string): void {
    //   if (!RequestChecks.checkOnlyNumbers(id)) { throw new Error(Validators.invalidIdError); }
    // }
    static validateEmail(email) {
        if (!exporter_2.RequestChecks.checkEmail(email)) {
            throw new requestError_1.default({
                message: exporter_1.errorMessages.INVALID_EMAIL,
                statusCode: exporter_1.httpStatus.BAD_REQUEST,
            });
        }
    }
}
exports.default = Validators;
