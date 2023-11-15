// libraries
import {
  Entity,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// entity
import { Aprovado } from './exporter';

// SSOT
import SituacaoDBConstants from '../../SSOT/SituacaoDBConstants';

@Entity(SituacaoDBConstants.nomeEntidade)
export default class Situacao {
// atributos---------------------------------------
  @PrimaryColumn({ type: 'text', name: SituacaoDBConstants.nomeSituacao })
    nome: string;

  @CreateDateColumn({ name: SituacaoDBConstants.criadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: SituacaoDBConstants.atualizadoEm })
    atualizadoEm: Date;

  // relacionamentos---------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Aprovado, (aprovado) => aprovado.situacao)
  // @JoinColumn({ name: SituacaoDBConstants.NomeSituacao, })
    aprovadosNaSituacao: Aprovado[];
}
