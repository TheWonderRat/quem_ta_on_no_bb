import { Entity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado';
import TurmaDBConstants from '../constants/TurmaDBConstants';
import AprovadosDBConstants from '../../Aprovado/constants/AprovadosDBConstants';

@Entity(TurmaDBConstants.NomeEntidade)
export class Turma {
// atributos----------------------------------------------------------
  @PrimaryColumn({ type: 'text', name: TurmaDBConstants.Numero })
    numero: number;

  @CreateDateColumn({ name: TurmaDBConstants.CriadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: TurmaDBConstants.AtualizadoEm })
    atualizadoEm: Date;

  // relacionamentos----------------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Aprovado, (aprovado) => aprovado.turma)
  @JoinColumn({ name: TurmaDBConstants.Numero, referencedColumnName: AprovadosDBConstants.Turma })
    aprovadosNaTurma: Aprovado[];
}
