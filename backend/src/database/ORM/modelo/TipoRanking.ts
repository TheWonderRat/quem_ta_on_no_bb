import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('tipo_ranking')
export default class TipoRanking{

  @PrimaryColumn()
  nome: string;
}
