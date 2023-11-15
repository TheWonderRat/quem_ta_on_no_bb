// libraries
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// entity
import { Lista, Situacao, Turma, LotadoEm } from './exporter';

// SSOT
import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';
import TurmaDBConstants from '../../SSOT/TurmaDBConstants';

@Entity(AprovadosDBConstants.nomeEntidade)
export default class Aprovado {
  // atributos-----------------------------------------------------------
  @PrimaryColumn({ type: 'bigint', name: AprovadosDBConstants.inscricao })
    inscricao: number;

  @Column({ type: 'text', name: AprovadosDBConstants.nome })
    nome: string;

  @Column({ type: 'text', name: AprovadosDBConstants.senha })
    senha: string;

  @Column({ type: 'timestamp', nullable: true, name: AprovadosDBConstants.dataPosse })
    dataPosse: Date;

  @Column({ type: 'timestamp', nullable: true, name: AprovadosDBConstants.dataQuestionario })
    dataQuestionario: Date;

  @Column({ type: 'timestamp', nullable: true, name: AprovadosDBConstants.dataQualificacao })
    dataQualificacao: Date;

  @Column({ default: false, name: AprovadosDBConstants.pcd })
    pcd:boolean;

  @Column({ default: false, name: AprovadosDBConstants.ppp })
    ppp:boolean;

  @CreateDateColumn({ name: AprovadosDBConstants.criadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: AprovadosDBConstants.atualizadoEm })
    atualizadoEm: Date;

  @Column({ name: AprovadosDBConstants.situacao })
    situacao: string;

  @Column({ name: AprovadosDBConstants.turma, nullable: true })
    turma: number;

  // relacionamentos-----------------------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade

  @OneToMany(() => Lista, (lista) => lista.aprovadoVinculado)
  @JoinColumn({
    name: AprovadosDBConstants.inscricao,
    // descomentar esta linha gera NAO erro no typeorm,
    // ao contratio da entidade Situacao
    // coloque aqui porque a chave primaria e composta
    // aparentemente nao tem a ver com o fato de Lista possuir uma chave primaria composta
    // talvez tenha a ver com o fato de ser uma chave composta referenciada por outras relacoes
  })
    aprovadoNasListas: Lista[];

  @OneToOne(() => LotadoEm, (lotacao) => lotacao.aprovadoNaLotacao)
  // @JoinColumn({ name: AprovadosDBConstants.Inscricao } )
    lotadoEm: LotadoEm;

  @ManyToOne(() => Situacao, (situacao) => situacao.aprovadosNaSituacao)
  @JoinColumn({
    name: AprovadosDBConstants.situacao,
    // descomentar esta linha gera erro no typeorm, sabe-se la o motivo
    // deixar ele inferir a chave primary e ok
    // por seguranca, comentarei todas as referencias que nao forem necessarias
    // pois ele sempre busca pela chave primaria nas relacoes
    // referencedColumnName: SituacaoDBConstants.NomeSituacao
  })
    estaNaSituacao: Situacao;

  @ManyToOne(() => Turma, (turma) => turma.numero)
  @JoinColumn({
    name: AprovadosDBConstants.turma,
    referencedColumnName: TurmaDBConstants.numero,
  })
    estaNaTurma: Turma;
}
