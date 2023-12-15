//A validacao celebrate deve obedecer aos tipos
export type RequisicaoParaListarORanking = { 
  aprovados: number, 
  pagina: number, 
  tipoRanking: string, 
  cidade?: string, 
  diretoria?: string, 
  turma?: number, 
  situacao?: string
}
//A validacao celebrate deve obedecer aos tipos
export type RespostaParaListarORanking = { mensagem: string }
