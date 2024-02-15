import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from 'typeorm'
import Aprovado from './Aprovado';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';
import { ErroDeAtualizacao as erro } from '../../../SSOT/base_de_dados/entidades';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.ErroDeAtualizacao)
export default class ErroDeAtualizacao{

  @PrimaryColumn({name: atributos.ErroAtualizacao.PosicaoDoAprovado})
  posicaoDoAprovadoNaAmpla: number;

  @PrimaryColumn({name: atributos.ErroAtualizacao.Tipo})
  tipo: string;

  @PrimaryColumn({ default: new Date()})
  ocorridoEm: Date

  @Column({name: atributos.ErroAtualizacao.Log })
  log: string;


  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  /*--------------------------------join---------------------------------------*/ 

  @OneToOne(() => Aprovado,(usuario) => usuario.contatoDoAprovado)
  @JoinColumn({name: atributos.Contato.PosicaoAmpla, referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado;
}
