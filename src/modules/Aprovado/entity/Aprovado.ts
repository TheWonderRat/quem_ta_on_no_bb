import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Lista } from '../../Lista/entity/Lista';
import { Situacao } from '../../Situacao/entity/Situacao';
import { Turma } from '../../Turma/entity/Turma';

@Entity('aprovado')
export default class Aprovado {
  @ManyToMany(() => Lista, (lista) => lista.inscricao)
  @ManyToOne(() => Situacao, (situacao) => situacao.nome)
  @PrimaryColumn({ type: 'bigint' })
    inscricao: number;

  @Column()
    nome: string;

  @Column()
    senha: string;

  @Column()
  @ManyToOne(() => Situacao, (situacao) => situacao.nome)
    situacao: string;

  @Column({ nullable: true })
    dataPosse: Date;

  @Column({ nullable: true })
    dataQuestionario: Date;

  @Column({ nullable: true })
    dataQualificacao: Date;

  @ManyToOne(() => Turma, (turma) => turma.id)
  @Column({ nullable: true })
    lotacao: number;

  @ManyToOne(() => Turma, (turma) => turma.id)
  @Column({ nullable: true })
    turma: number;
}
