import { 
  Entity, 
  PrimaryColumn, 
  JoinColumn,
  Column, 
  ManyToOne, 
  UpdateDateColumn, 
  DeleteDateColumn
} from 'typeorm'
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';
import { Aprovado } from './exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Sugestao)
export default class Sugestao{

  @PrimaryColumn()
  uuidWhatsapp: string;

  @PrimaryColumn()
  posicaoAmpla: number

  @PrimaryColumn({default: new Date()})
  criadoEm: Date

//TODO:: inserir no arquivo de constantes
  @Column()
  sugestao: string;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @DeleteDateColumn()
  excluidoEm: Date;

//----------------------------------------------------------------------
  @ManyToOne(() => Aprovado,(aprovado)=> aprovado.sugestoesDoAprovado )
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({ referencedColumnName: atributos.Aprovado.PosicaoAmpla })
  aprovadoVinculado: Aprovado;
}
