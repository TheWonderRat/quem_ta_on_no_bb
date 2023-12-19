export type RequisicaoParaAtualizarSenha = { login: number, senha: string, novaSenha: string };
export type RespostaParaAtualizarSenha = { mensagem: string };
export type RequisicaoParaAtivarConta = { login: number, senha: string };
export type RespostaParaAtivarConta = { mensagem: string };
export type RequisicaoParaDesativarConta = { login: number, senha: string };
export type RespostaParaDesativarConta = { mensagem: string };
