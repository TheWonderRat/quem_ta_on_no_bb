import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, } from 'typeorm'
import { Aprovado, TipoRanking } from './exporter';
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Ranking)
export default class Ranking{

  @PrimaryColumn({name: atributos.Ranking.TipoRanking})
  tipoRanking: string;

  @PrimaryColumn({name: atributos.Ranking.Inscricao})
  inscricao: number;

  @Column({name: atributos.Ranking.Posicao})
  posicao: number

  /*------------------------------------join--------------------------------*/
  @ManyToOne(() => Aprovado, (aprovado) => aprovado.rankingsDoAprovado)
  @JoinColumn({name: atributos.Ranking.Inscricao })
  aprovado: Aprovado

  @ManyToOne(() => TipoRanking, (tipo) => tipo.rankings )
  @JoinColumn({name: atributos.Ranking.TipoRanking})
  rankingVinculado: TipoRanking 
}
