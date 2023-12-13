import { Ranking } from './exporter';
import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany, JoinColumn, } from 'typeorm'
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.TipoRanking)
export default class TipoRanking{

  @PrimaryColumn({name: atributos.TipoRanking.Nome})
  nome: string;

  /*----------------------------------join----------------------------*/

  @OneToMany(() => Ranking,(ranking) => ranking.rankingVinculado)
  rankings: Ranking[]

}
