import { Entity, PrimaryColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado'
import SituacaoDBConstants from '../constants/SituacaoDBConstants';

@Entity(SituacaoDBConstants.NomeEntidade)
export class Situacao{
  
//atributos---------------------------------------
  @PrimaryColumn({ type: 'text', name: SituacaoDBConstants.NomeSituacao})
  nome: string;

  @CreateDateColumn({ name: SituacaoDBConstants.CriadoEm })
  criadoEm: Date
  
  @UpdateDateColumn({ name: SituacaoDBConstants.AtualizadoEm })
  atualizadoEm: Date

//relacionamentos---------------------------------------
//relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Aprovado, (aprovado) => aprovado.situacao)
  //@JoinColumn({ name: SituacaoDBConstants.NomeSituacao, })
  aprovadosNaSituacao: Aprovado[]

}

