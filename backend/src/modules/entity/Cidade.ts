// libraries
import {
  Entity,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

// entity
import { Lotacao } from './exporter';

// SSOT
import CidadeDBConstants from '../../SSOT/CidadeDBConstants';

@Entity(CidadeDBConstants.nomeEntidade)
export default class Cidade {
  // atributos---------------------------------------------------
  @PrimaryColumn({ name: CidadeDBConstants.nomeCidade, type: 'text' })
    nome: string;

  @CreateDateColumn({ name: CidadeDBConstants.criadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: CidadeDBConstants.atualizadoEm })
    atualizadoEm: Date;

  // relacionamentos---------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Lotacao, (lotacao) => lotacao.cidadeVinculada)
  @JoinColumn({
    name: CidadeDBConstants.nomeCidade,
  })
    lotacoesVinculadas: Lotacao[];
}
