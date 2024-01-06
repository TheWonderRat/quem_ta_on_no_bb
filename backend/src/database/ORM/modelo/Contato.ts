import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from 'typeorm'
import Aprovado from './Aprovado';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Contato)
export default class Contato{

  @PrimaryColumn({name: atributos.Contato.PosicaoAmpla})
  posicao: number;

  @Column({name: atributos.Contato.Celular})
  celular: number;

  @Column({name: atributos.Contato.Email})
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  /*--------------------------------join---------------------------------------*/ 

  @OneToOne(() => Aprovado,(usuario) => usuario.contatoDoAprovado)
  @JoinColumn({name: atributos.Contato.PosicaoAmpla, referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  usuarioVinculado: Aprovado 
}
