import * as messages from '../../types/error/messages';

export enum AuthErrorMessage{
  MissingToken = "O token nao foi fornecido" ,
  TokenOutOfDate = "O token encontrado ja expirou",
  InvalidToken = "O token encontrado e invalido",
}

export enum AuthErrorCode{
  MissingToken = 400,
  TokenOutOfDate = 401,
  InvalidToken = 402
}

export enum DBErrorMessage{
  MissingToken = "Miau",
  TokenOutOfDate = "miau",
  InvalidToken = "miau" 
}
export enum DBErrorCode{
  MissingToken = 400,
  TokenOutOfDate = 401,
  InvalidToken = 402
}

export enum GenericErrorMessage{
  MissingToken = "message 1",
  TokenOutOfDate = "message 2",
  InvalidToken = "message 3" 
}

export enum GenericErrorCode{
  MissingToken = 400,
  TokenOutOfDate = 401,
  InvalidToken = 402
}

