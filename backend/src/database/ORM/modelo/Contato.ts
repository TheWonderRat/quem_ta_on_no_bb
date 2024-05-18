import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from 'typeorm'
import Aprovado from './Aprovado';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Contato)
export default class Contato{

  @PrimaryColumn({name: atributos.Contato.PosicaoAmpla})
  posicao: number;

  @Column({name: atributos.Contato.UUIDWhatsapp})
  uuidWhatsapp: string;

  @Column({name: atributos.Contato.Email})
  email: string

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  /*--------------------------------join---------------------------------------*/ 

  @OneToOne(() => Aprovado,(usuario) => usuario.contatoDoAprovado)
  @JoinColumn({name: atributos.Contato.PosicaoAmpla, referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado 
}
