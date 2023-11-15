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
import { Lista } from './exporter';

// SSOT
import TipoListaDBConstants from '../../SSOT/TipoListaDBConstants';

@Entity(TipoListaDBConstants.nomeEntidade)
export default class TipoLista {
// atributos------------------------------------------------
  @PrimaryColumn({ type: 'text', name: TipoListaDBConstants.tipoLista })
  // DEVE TER O MESMO NOME DA CONSTANTE DO ARQUIVO DE CONSTANTES
    tipo: string;

  @CreateDateColumn({ name: TipoListaDBConstants.criadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: TipoListaDBConstants.atualizadoEm })
    atualizadoEm: Date;

  // relacionamentos------------------------------------------------
  // relacioinamentos devem ter o mesmo nome da  variavel da entidade

  @OneToMany(() => Lista, (lista) => lista.tipo)
  @JoinColumn({ name: TipoListaDBConstants.tipoLista })
    listasVinculadas: Lista[];
}
