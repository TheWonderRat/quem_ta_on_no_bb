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
    //Erros no servidos
    AppErrorType[AppErrorType["ErroNoServidor"] = 5] = "ErroNoServidor";
})(AppErrorType = exports.AppErrorType || (exports.AppErrorType = {}));
const ErrorConstants = {
    missingToken: { message: "Token de identificacao nao foi encontrado!", statusCode: 400 },
    userNotAuthenticated: { message: "A sessao do usuario expirou", statusCode: 400 },
    missmatchedPassword: { message: "Combicanao usuario/senha nao confere", statusCode: 400 },
    userNotFound: { message: "O usuario nao foi encontrado", statusCode: 400 },
    databaseNotFound: { message: "Nao foi possivel conectar com a base de dados", statusCode: 400 },
    serverSideError: { message: "Nao foi possivel conectar com a base de dados", statusCode: 400 },
};
class AppError {
    message;
    statusCode;
    constructor(error) {
        let errorType;
        switch (error) {
            //error de informacoes faltando
            case AppErrorType.MissingToken:
                errorType = ErrorConstants.missingToken;
                break;
            //
            //erros de autenticacao
            case AppErrorType.UserNotAuthenticated:
                errorType = ErrorConstants.userNotAuthenticated;
                break;
            case AppErrorType.MissmatchedPassword:
                errorType = ErrorConstants.missmatchedPassword;
                break;
            //
            //error na base de dados
            case AppErrorType.DataBaseNotFound:
                errorType = ErrorConstants.databaseNotFound;
                break;
            case AppErrorType.UserNotFound:
                errorType = ErrorConstants.userNotFound;
                break;
            default:
                errorType = ErrorConstants.serverSideError;
                break;
        }
        this.message = errorType.message;
        this.statusCode = errorType.statusCode;
    }
}
exports.default = AppError;
