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
//TODO:: criar os tipos de resposta depois
export type RespostaParaListarORanking = { mensagem: string , aprovados: any}
