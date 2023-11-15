// libraries
import {
  Entity,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// entity
import { Aprovado } from './exporter';

// SSOT
import TurmaDBConstants from '../../SSOT/TurmaDBConstants';
import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';

@Entity(TurmaDBConstants.nomeEntidade)
export default class Turma {
// atributos----------------------------------------------------------
  @PrimaryColumn({ type: 'text', name: TurmaDBConstants.numero })
    numero: number;

  @CreateDateColumn({ name: TurmaDBConstants.criadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: TurmaDBConstants.atualizadoEm })
    atualizadoEm: Date;

  // relacionamentos----------------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Aprovado, (aprovado) => aprovado.turma)
  @JoinColumn({
    name: TurmaDBConstants.numero,
    referencedColumnName: AprovadosDBConstants.turma,
  })
    aprovadosNaTurma: Aprovado[];
}
