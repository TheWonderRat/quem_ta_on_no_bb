//  classe abstrata
export { default as AppError } from './AppError';
//  erros de autenticacao
export { default as TokenExpirou } from './autenticacao/TokenExpirou';
export { default as TokenInvalido } from './autenticacao/TokenInvalido';
export { default as TokenNaoEncontrado } from './autenticacao/TokenNaoEncontrado';
//  erros de autorizacao
export { default as SenhaIncompativel } from './autorizacao/SenhaIncompativel';
export { default as UsuarioNaoExiste } from './autorizacao/UsuarioNaoExiste';
//  erros da base de dados 
export { default as ErroDaBaseDeDados } from './base_de_dados/ErroDaBaseDeDados';
//  erros desconhecidos 
export { default as ErroNoServidor } from './desconhecido/ErroNoServidor';
//  erros de ativacao de conta
export { default as ContaEstaAtiva } from './ativacao/ContaEstaAtiva';
export { default as ContaEstaInativa } from './ativacao/ContaEstaInativa';
