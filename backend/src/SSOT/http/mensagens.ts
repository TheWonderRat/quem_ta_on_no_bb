

export enum OkMessage{
  Ok = "Executado com sucesso",
  Criado = "Recurso criado com sucesso!"
}

export enum ErrorMessage{
  UserNotFound = "O usuário nao foi encontrado",
  MissingToken = "Token de identificação nao foi encontrado!",
  NotAuthenticated = "A sessão do usuário expirou",
  MissmatchedPassword = "Combinação usuário/senha nao confere",
  DatabaseNotFound = "Nao foi possível conectar com a base de dados",
  ServerSideError = "Nao foi possível conectar com a base de dados"
}

