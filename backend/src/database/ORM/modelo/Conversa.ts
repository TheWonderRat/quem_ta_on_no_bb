import { Entity, PrimaryColumn, JoinColumn,Column, ManyToOne, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';
import { Aprovado } from './exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Conversa)
export default class Conversa{

  @PrimaryColumn()
  uuidWhatsapp: string;

  @PrimaryColumn()
  iniciadoEm: Date

  @PrimaryColumn({default: new Date()})
  enviadaEm: Date

  @Column({ nullable: true})
  posicaoAmpla?: number

//TODO:: inserir no arquivo de constantes
  @Column()
  mensagemCliente: string;

  @Column()
  respostaBot: string;

  @UpdateDateColumn()
  atualizadaEm: Date

  @DeleteDateColumn()
  excluidaEm: Date

//----------------------------------------------------------------------
  @ManyToOne(() => Aprovado,(aprovado)=> aprovado.conversasDoAprovado)
  //TODO:: inserir os nomes dos atributos no SSOT
  @JoinColumn({name: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado;
}
