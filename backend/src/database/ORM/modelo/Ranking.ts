import { 
  Entity, 
  PrimaryColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn
} from 'typeorm'
import { 
  Aprovado, 
  TipoRanking 
} from './exporter';
import { 
  atributos, 
  entidades 
} from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Ranking)
export default class Ranking{

  @PrimaryColumn({name: atributos.Ranking.TipoRanking})
  tipoRanking: string;

  @PrimaryColumn({name: atributos.Ranking.PosicaoAmpla})
  posicao: number;

  @PrimaryColumn({name: atributos.Ranking.Posicao})
  posicaoNoRanking: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  /*------------------------------------join--------------------------------*/
  @ManyToOne(() => Aprovado, (aprovado) => aprovado.rankingsDoAprovado)
  @JoinColumn({name: atributos.Ranking.PosicaoAmpla, referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado

  @ManyToOne(() => TipoRanking, (tipo) => tipo.rankingsVinculados )
  @JoinColumn({name: atributos.Ranking.TipoRanking})
  tipoVinculado: TipoRanking 
}
