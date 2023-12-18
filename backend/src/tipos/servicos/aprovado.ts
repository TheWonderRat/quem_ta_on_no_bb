


//A validacao celebrate deve obedecer aos tipos
//TODO:: criar senha aleatoria que seria informada pelo bot
//login e a posicao na ampla concorrencia
export type RequisicaoParaAtualizarSenha = { login: number , senha: string, novaSenha: string }
export type RespostaParaAtualizarSenha = { mensagem: string }

//A validacao celebrate deve obedecer aos tipos
//TODO:: criar senha aleatoria que seria informada pelo bot
//login e a posicao na ampla concorrencia
export type RequisicaoParaAtivarConta = { login: number, senha: string }
export type RespostaParaAtivarConta = { mensagem: string }

//A validacao celebrate deve obedecer aos tipos
//login e a posicao na ampla concorrencia
export type RequisicaoParaDesativarConta = { login: number, senha: string }
export type RespostaParaDesativarConta = { mensagem: string }



