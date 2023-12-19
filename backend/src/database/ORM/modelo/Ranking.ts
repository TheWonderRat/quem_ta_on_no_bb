import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, } from 'typeorm'
import { Aprovado, TipoRanking } from './exporter';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Ranking)
export default class Ranking{

  @PrimaryColumn({name: atributos.Ranking.TipoRanking})
  tipoRanking: string;

  @PrimaryColumn({name: atributos.Ranking.PosicaoAmpla})
  posicao: number;

  @Column({name: atributos.Ranking.Posicao})
  posicaoNoRanking: number

  /*------------------------------------join--------------------------------*/
  @ManyToOne(() => Aprovado, (aprovado) => aprovado.rankingsDoAprovado)
  @JoinColumn({name: atributos.Ranking.PosicaoAmpla, referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado

  @ManyToOne(() => TipoRanking, (tipo) => tipo.rankingsVinculados )
  @JoinColumn({name: atributos.Ranking.TipoRanking})
  tipoVinculado: TipoRanking 
}
