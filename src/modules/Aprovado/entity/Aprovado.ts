import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Lista } from '../../Lista/entity/Lista'
import { Situacao } from '../../Situacao/entity/Situacao'
import { Turma } from '../../Turma/entity/Turma'
import AprovadosDBConstants from '../constants/AprovadosDBConstants';
import TurmaDBConstants from '../../Turma/constants/TurmaDBConstants';
import { LotadoEm } from '../../LotadoEm/entity/LotadoEm';

@Entity(AprovadosDBConstants.NomeEntidade)
export class Aprovado{
  //atributos-----------------------------------------------------------
  @PrimaryColumn({type: 'bigint', name: AprovadosDBConstants.Inscricao})
  inscricao: number

  @Column({ type: 'text', name: AprovadosDBConstants.Nome })
  nome: string

  @Column({ type: 'text', name: AprovadosDBConstants.Senha })
  senha: string

  @Column({type: 'timestamp',nullable: true, name: AprovadosDBConstants.DataPosse })
  dataPosse: Date

  @Column({type: 'timestamp',nullable: true, name: AprovadosDBConstants.DataQuestionario })
  dataQuestionario: Date

  @Column({type: 'timestamp',nullable: true, name: AprovadosDBConstants.DataQualificacao,})
  dataQualificacao: Date

  @Column({default: false, name: AprovadosDBConstants.PCD })
  pcd:boolean

  @Column({default: false, name: AprovadosDBConstants.PPP,})
  ppp:boolean

  @CreateDateColumn({name: AprovadosDBConstants.CriadoEm })
  criadoEm: Date

  @UpdateDateColumn({ name: AprovadosDBConstants.AtualizadoEm})
  atualizadoEm: Date 

  @Column({name: AprovadosDBConstants.Situacao})
  situacao: string

  @Column({name: AprovadosDBConstants.Turma, nullable: true})
  turma: number 

  //relacionamentos-----------------------------------------------------------
//relacionamentos devem ter o mesmo nome da variavel da entidade

  @OneToMany(() => Lista, (lista) => lista.aprovadoVinculado )
  @JoinColumn({ 
    name: AprovadosDBConstants.Inscricao, 
    //descomentar esta linha gera NAO erro no typeorm,
    //ao contratio da entidade Situacao
    //coloque aqui porque a chave primaria e composta
    //aparentemente nao tem a ver com o fato de Lista possuir uma chave primaria composta
    //talvez tenha a ver com o fato de ser uma chave composta referenciada por outras relacoes
  })
  aprovadoNasListas: Lista[]

  @OneToOne(() => LotadoEm, (lotacao) => lotacao.aprovadoNaLotacao)
  //@JoinColumn({ name: AprovadosDBConstants.Inscricao } )
  lotadoEm: LotadoEm 

  @ManyToOne(() => Situacao, (situacao) => situacao.aprovadosNaSituacao )
  @JoinColumn({ 
    name: AprovadosDBConstants.Situacao,
    //descomentar esta linha gera erro no typeorm, sabe-se la o motivo
    //deixar ele inferir a chave primary e ok
    //por seguranca, comentarei todas as referencias que nao forem necessarias
    //pois ele sempre busca pela chave primaria nas relacoes
    //referencedColumnName: SituacaoDBConstants.NomeSituacao
  })
  estaNaSituacao: Situacao 

  @ManyToOne(() => Turma, (turma) => turma.numero)
  @JoinColumn({ 
    name: AprovadosDBConstants.Turma, 
    referencedColumnName: TurmaDBConstants.Numero
  })
  estaNaTurma: Turma 
}

