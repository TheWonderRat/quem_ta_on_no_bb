export enum ErroGenerico{
  ErroNoServidor = "erro desconhecido",
}

export enum ErroAutenticacao{
  TokenInvalido = "O token de autenticacao fornecido nao e valido.",
  TokenExpirou = "O token de autenticacao fornecido expirou.",
  TokenNaoEncontrado = "O token de autenticacao nao foi encontrado.",
}

export enum ErroAutorizacao{
  UsuarioNaoEncontrado = "Usuario nao encontrado",
  SenhaNaoConfere = "A senha fornecido nao pertence a esse usuario",
}

export enum ErroBD {
  ConexaoNaoEncontrada = "Nao foi possivel realizar a conexao com o Banco de Dados",
}
