"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorType = void 0;
//como typescript nao suporta nem interfaces em enums nem enums que encampsulam objetos,
//a solucaoe e deixar tudo num mesmo enum por enquanto
var AppErrorType;
(function (AppErrorType) {
    //informacoes faltando
    AppErrorType[AppErrorType["MissingToken"] = 0] = "MissingToken";
    //error de autenticacao
    AppErrorType[AppErrorType["UserNotAuthenticated"] = 1] = "UserNotAuthenticated";
    AppErrorType[AppErrorType["MissmatchedPassword"] = 2] = "MissmatchedPassword";
    //algo nao encontrados
    AppErrorType[AppErrorType["UserNotFound"] = 3] = "UserNotFound";
    AppErrorType[AppErrorType["DataBaseNotFound"] = 4] = "DataBaseNotFound";
})(AppErrorType || (exports.AppErrorType = AppErrorType = {}));
const ErrorConstants = {
    missingToken: { message: "", statusCode: 400 },
    userNotAuthenticated: { message: "", statusCode: 400 },
    missmatchedPassword: { message: "", statusCode: 400 },
    userNotFound: { message: "", statusCode: 400 },
    databaseNotFound: { message: "", statusCode: 400 }
};
class AppError {
    message;
    statusCode;
    constructor(error) {
        let message;
        let statusCode;
        switch (error) {
            //error de informacoes faltando
            case AppErrorType.MissingToken:
                message = ErrorConstants.missingToken.message;
                statusCode = ErrorConstants.missingToken.statusCode;
                break;
            //
            //erros de autenticacao
            case AppErrorType.UserNotAuthenticated:
                message = ErrorConstants.userNotAuthenticated.message;
                statusCode = ErrorConstants.userNotAuthenticated.statusCode;
                break;
            case AppErrorType.MissmatchedPassword:
                message = ErrorConstants.missmatchedPassword.message;
                statusCode = ErrorConstants.missmatchedPassword.statusCode;
                break;
            //
            //error na base de dados
            case AppErrorType.DataBaseNotFound:
                message = ErrorConstants.databaseNotFound.message;
                statusCode = ErrorConstants.databaseNotFound.statusCode;
                break;
            case AppErrorType.UserNotFound:
                message = ErrorConstants.userNotFound.message;
                statusCode = ErrorConstants.userNotFound.statusCode;
                break;
        }
    }
}
exports.default = AppError;
