export type RequisicaoParaListarORanking = {
  aprovados: number,
  pagina: number,
  tipoRanking: string,
  cidade?: string,
  diretoria?: string,
  turma?: number,
  situacao?: string,
};
export type RespostaParaListarORanking = { mensagem: string, aprovados: any}; //  TODO:: criar os tipos de resposta para aprovados//
/*
type RespostaRankingBase = {
  ppp: boolean,
  pcd: boolean,
  posicao: number,
  ranking: string,
  turma?: number,
  situacao?: string,
  cidade?: string,
  diretoria?: string
}
*/
