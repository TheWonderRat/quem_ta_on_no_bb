"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils
const exporter_1 = require("../shared/utils/exporter");
class AuthMid {
    static hasToken(req, __res, next) {
        const authHeader = req.headers;
        try {
            exporter_1.RequestValidators.authorizationField(authHeader);
            next();
        }
        catch (error) {
            next(error);
        }
    }
    static hasValidToken(request, __response, next) {
        var _a;
        try {
            const positionArray = 1;
            const token = (_a = request.headers
                .authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[positionArray];
            exporter_1.TokenManager.validateToken(token);
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthMid;
