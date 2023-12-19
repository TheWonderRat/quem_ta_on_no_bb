export type TipoAprovado = { 
  inscricao: number,
  nome: string,
  senha: string,
  cadastroReserva: boolean,
  posicaoAmpla: number,
  posicaoPPP: number,
  posicaoPCD: number,
}

export type TipoRanking = {
  posicaoAmpla: number,
  posicaoRanking: number,
  tipo: string,
}

export type TipoSituacao = {
  posicao: number,
  situacao: string,
  cidade?: string,
  diretoria?: string
  dataPosse?: Date,
  turma?: number
}
