


//A validacao celebrate deve obedecer aos tipos
//TODO:: criar senha aleatoria que seria informada pelo bot
export type RequisicaoParaAtualizarSenha = { inscricao: number , senha: string, novaSenha: string }
export type RespostaParaAtualizarSenha = { mensagem: string }

//A validacao celebrate deve obedecer aos tipos
//TODO:: criar senha aleatoria que seria informada pelo bot
export type RequisicaoParaAtivarConta = { inscricao: number, senha: string }
export type RespostaParaAtivarConta = { mensagem: string }

//A validacao celebrate deve obedecer aos tipos
export type RequisicaoParaDesativarConta = { inscricao: number, senha: string }
export type RespostaParaDesativarConta = { mensagem: string }



