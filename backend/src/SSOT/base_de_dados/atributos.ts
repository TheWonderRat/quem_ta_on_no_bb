// ids
//constantes dos atributos das entidades
export enum Cidade{
  Nome = "nome",
  Estado = "estado",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Contato{
  PosicaoAmpla = 'posicao',
  Celular = "celular",
  Email = "email",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Diretoria{
  Nome = "nome",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Estado{
  Nome = "nome",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Lotacao{
  Cidade = "cidade",
  Estado = "estado",
  Diretoria = "diretoria",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum LotadoEm{
  PosicaoAmpla = "posicao",
  Cidade = "cidade_vinculada",
  Estado = "estado_vinculado",
  Diretoria = "diretoria_vinculada",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Ranking{
  PosicaoAmpla = 'posicao',
  TipoRanking = "tipo",
  Posicao = "posicao_no_ranking",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum TipoRanking{
  Nome = "tipo",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em" 
}

export enum Situacao{
  Nome = "nome_situacao",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Turma{
  Numero = "numero_turma",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

export enum Aprovado{
  PosicaoAmpla = 'posicao',
  Nome = "nome_aprovado",
  Senha = "senha_aprovado",
  Situacao = "situacao_aprovado",
  PPP = 'ppp',
  PCD = 'pcd',
  Turma = "turma_aprovado",
  Ativo = "ativo",
  CriadoEm = "criado_em",
  AtualizadoEm = "atualizado_em"
}

/*
export const idKey: string = 'id';
export const userId: string = 'user_id';
export const classId: string = 'class_id';
export const statusId: string = 'status_id';
export const departmentId: string = 'department_id';
export const jobLocationId: string = 'job_location_id';

// names
export const cityName: string = 'city_name';
export const createdAt: string = 'created_at';
export const updatedAt: string = 'updated_at';
export const statusName: string = 'status_name';
export const passwordHash: string = 'password_hash';
export const directoryName: string = 'directory_name';
export const departmentName: string = 'department_name';
*/
