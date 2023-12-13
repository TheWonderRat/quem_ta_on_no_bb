import { Entity, Column, PrimaryColumn, ManyToMany, OneToOne, JoinColumn, } from 'typeorm'
import Aprovado from './Aprovado';
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Contato)
export default class Contato{

  @PrimaryColumn({name: atributos.Contato.Inscricao})
  inscricao: number;

  @Column({name: atributos.Contato.Celular})
  celular: number;

  @Column({name: atributos.Contato.Email})
  email: string

  /*--------------------------------join---------------------------------------*/ 

  @OneToOne(() => Aprovado,(usuario) => usuario.contato)
  @JoinColumn({name: atributos.Contato.Inscricao, referencedColumnName: atributos.Aprovado.Inscricao})
  usuarioVinculado: Aprovado 
}
