"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils
const exporter_1 = require("../shared/utils/exporter");
class UserMid {
    static validateFormat(request, __response, next) {
        try {
            exporter_1.RequestValidators.arrayValidator(request.body);
            next();
        }
        catch (error) {
            next(error);
        }
    }
    static validateUserFields(request, __response, next) {
        try {
            const newUsers = request.body;
            newUsers.forEach((newUser) => {
                exporter_1.RequestValidators.userRegisterFields(newUser);
                exporter_1.RequestValidators.userRegisterNumberFields(newUser);
                exporter_1.RequestValidators.userRegisterBooleanFields(newUser);
            });
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UserMid;
