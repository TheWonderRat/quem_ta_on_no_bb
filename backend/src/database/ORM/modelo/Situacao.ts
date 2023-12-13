import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne, OneToOne, OneToMany, JoinColumn, } from 'typeorm'
import { Aprovado } from './exporter';
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Situacao)
export default class Situacao{

  @PrimaryColumn({name: atributos.Situacao.Nome})
  nome: string;

  /*----------------------------------join----------------------------*/

  @OneToMany(() => Aprovado, (usuario) => usuario.situacaoVinculada)
  usuariosNaSituacao: Aprovado[]
  
}
