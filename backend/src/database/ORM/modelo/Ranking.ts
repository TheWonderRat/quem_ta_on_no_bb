import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('ranking')
export default class Ranking{

  @PrimaryColumn()
  tipoLista: string;

  @PrimaryColumn()
  inscricao: number;
}
