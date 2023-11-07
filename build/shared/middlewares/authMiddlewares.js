"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const AppError_1 = __importDefault(require("../../shared/errors/AppError"));

const auth_1 = __importDefault(require("../../config/auth"));
//Avoiding import error
const jsonwebtoken = require('jsonwebtoken');
const { verify } = jsonwebtoken;
;
async function isAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default("User is not authenticated!");
    }
    const [, token] = authHeader.split(' ');
    try {
        //TODO:: refresh token?
        const decodedToken = await verify(token, auth_1.default.jwt.secret, { complete: true });
        /*
         const { sub } = decodedToken as TokenPayload;
          request.user = {
            inscricao: sub,
          };
        */
        return next();
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.default("PORRTA");
    }
}
exports.isAuthenticated = isAuthenticated;
/*
export async function isFileOwner(request: Request,next: NextFunction,fileId: String){
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("No authentication for the user");
    }

    const [,token] = authHeader.split(' ');
    let decodedToken :JwtPayload ;


    try{
        decodedToken= await verify( token, authConfig.jwt.secret, {complete: true})
    }
    catch(error){
        throw new AppError("PORRTA");
    }

        /*
        if(){
        }
    }
    else{
        next()
    }

    throw new AppError("User has no authorization to edit this file!");
}
*/
