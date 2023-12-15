export enum ErroGenerico{
  ErroNoServidor = 500,
}

export enum ErroAutenticacao{
  TokenInvalido = 500,
  TokenExpirou = 500,
  TokenNaoEncontrado = 500,
}

export enum ErroAutorizacao{
  UsuarioNaoEncontrado = 500,
  SenhaNaoConfere = 500,
}

export enum ErroBD {
  ConexaoNaoEncontrada = 500,
}

export enum ErroDeAtivacao{
  ContaEstaInativa = 400,
  ContaEstaAtiva
}
