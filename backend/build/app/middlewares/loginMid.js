"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils
const exporter_1 = require("../shared/utils/exporter");
class LoginMid {
    static validateLoginFields(request, __response, next) {
        try {
            exporter_1.RequestValidators.loginFields(request.body);
            exporter_1.RequestValidators.validateEmail(request.body.email);
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = LoginMid;
