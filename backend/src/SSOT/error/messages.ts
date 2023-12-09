import * as messages from '../../types/error/messages';

export enum AuthErrorMessage{
  MissingToken = "O token nao foi fornecido" ,
  TokenOutOfDate = "O token encontrado ja expirou",
  InvalidToken = "O token encontrado e invalido",
}

export enum DBErrorMessage{
  MissingToken = 400,
  TokenOutOfDate = 401,
  InvalidToken = 402
}

export enum GenericErrorMessage{
  MissingToken = 400,
  TokenOutOfDate = 401,
  InvalidToken = 402
}

