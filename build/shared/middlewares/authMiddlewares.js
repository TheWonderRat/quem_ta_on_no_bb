"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const AppError_2 = require("@shared/errors/AppError");
const auth_1 = __importDefault(require("@config/auth"));
const jsonwebtoken = require('jsonwebtoken');
const { verify } = jsonwebtoken;
async function isAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        //auth header is missing
        return next(AppError_2.AppErrorType.MissingToken);
    }
    try {
        //TODO:: refresh token?
        const [, token] = authHeader.split(' ');
        //const decodedToken para manipular os tokens da aplicacao
        await verify(token, auth_1.default.jwt.secret, { complete: true });
        return next();
    }
    catch (error) {
        return next(new AppError_1.default(AppError_2.AppErrorType.UserNotAuthenticated));
    }
}
exports.isAuthenticated = isAuthenticated;
