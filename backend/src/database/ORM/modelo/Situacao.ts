import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'
import { Aprovado } from './exporter';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Situacao)
export default class Situacao{

  @PrimaryColumn({name: atributos.Situacao.Nome})
  nome: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @DeleteDateColumn()
  excluidoEm: Date;
  /*----------------------------------join----------------------------*/

  @OneToMany(() => Aprovado, (usuario) => usuario.situacaoVinculada)
  aprovadosNaSituacao: Aprovado[]
  
}
