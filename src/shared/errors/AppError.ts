
//como typescript nao suporta nem interfaces em enums nem enums que encampsulam objetos,
//a solucaoe e deixar tudo num mesmo enum por enquanto
export enum AppErrorType{
  //informacoes faltando
  MissingToken,
  //error de autenticacao
  UserNotAuthenticated,
  MissmatchedPassword,
  //algo nao encontrados
  UserNotFound,
  DataBaseNotFound,
  //Erros no servidos
  ErroNoServidor,
}

interface IAppError{
  message: string ,
  statusCode: number
}

interface IErrorWrapper{
  missingToken: IAppError,
  userNotAuthenticated: IAppError,
  missmatchedPassword: IAppError,
  userNotFound: IAppError,
  databaseNotFound: IAppError 
  serverSideError: IAppError 
}

const ErrorConstants: IErrorWrapper= {
  missingToken: { message: "Token de identificacao nao foi encontrado!", statusCode: 400} ,
  userNotAuthenticated: { message: "A sessao do usuario expirou", statusCode: 400},
  missmatchedPassword: { message: "Combicanao usuario/senha nao confere", statusCode: 400 },
  userNotFound: { message: "O usuario nao foi encontrado", statusCode: 400 },
  databaseNotFound: { message: "Nao foi possivel conectar com a base de dados", statusCode: 400 },
  serverSideError: { message: "Nao foi possivel conectar com a base de dados", statusCode: 400 },
}




class AppError{
	public readonly message: string;
	public readonly statusCode: number;
  
  constructor(error: AppErrorType){
    let errorType: IAppError;

    switch(error){
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

    this.message = errorType.message ; this.statusCode = errorType.statusCode;
	}
}






export default AppError
