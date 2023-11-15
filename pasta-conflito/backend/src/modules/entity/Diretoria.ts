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
import DiretoriaDBConstants from '../../SSOT/DiretoriaDBConstants';

@Entity(DiretoriaDBConstants.nomeEntidade)
export default class Diretoria {
  // atributos------------------------------------------------------
  @PrimaryColumn({ type: 'text', name: DiretoriaDBConstants.nomeDiretoria })
    nome: string;

  @CreateDateColumn({ name: DiretoriaDBConstants.criadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: DiretoriaDBConstants.atualizadoEm })
    atualizadoEm: Date;

  // relacionamentos------------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Lotacao, (lotacao) => lotacao.diretoriaVinculada)
  @JoinColumn({ name: DiretoriaDBConstants.nomeDiretoria })
    lotacoesVinculadas: Lotacao[];
}
