export type RequisicaoAtualizarTodos = { captcha: string, userAgent?: string };
export type RespostaAtualizarTodos = { mensagem: string };

export type RequisicaoAtualizarEmMudanca = { captcha: string, userAgent?: string };
export type RespostaAtualizarEmMudanca = { mensagem: string };

export type RequisicaoAtualizarPorPosicaoAmpla = { captcha: string, userAgent?: string, aprovados: number[] };
export type RespostaAtualizarPorPosicaoAmpla= { mensagem: string };

export type RequisicaoAtualizarPorSituacao = { captcha: string, userAgent?: string, situacoes: string[] };
export type RespostaAtualizarPorSituacao = { mensagem: string };
