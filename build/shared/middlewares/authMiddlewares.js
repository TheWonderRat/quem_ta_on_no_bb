"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import {Jwt, JwtPayload,SignOptions,decode,verify, sign} from 'jsonwebtoken'
const auth_json_1 = __importDefault(require("../../config/auth.json"));
const AppError_1 = __importDefault(require("../errors/AppError"));
// Avoiding import error
const { verify } = jsonwebtoken_1.default;
function isAuthenticated(req, __res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : false;
        if (authHeader === false) {
            return new AppError_1.default('User is not authenticated!');
        }
        try {
            // TODO:: refresh token?
            const [, token] = authHeader.split(' ');
            verify(token, auth_json_1.default.jwt.secret, { complete: true });
            return next();
        }
        catch (error) {
            return next(new AppError_1.default('User is not authenticated'));
        }
    });
}
exports.default = isAuthenticated;
