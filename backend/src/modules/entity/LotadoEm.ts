// libraries
import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// entity
import { Aprovado, Lotacao } from './exporter';

// SSOT
import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';
import LotadoEmDBConstants from '../../SSOT/LotadoEmDBConstants';
import LotacaoDBConstants from '../../SSOT/LotacaoDBConstants';

@Entity(LotadoEmDBConstants.nomeEntidade)
export default class LotadoEm {
// atributos---------------------------------
  @PrimaryColumn({ type: 'bigint', name: LotadoEmDBConstants.inscricao })
    inscricao: number;

  @Column({ name: LotadoEmDBConstants.unidade })
    unidade: number;

  @Column({ name: LotadoEmDBConstants.diretoria })
    diretoria: string;

  @Column({ name: LotadoEmDBConstants.cidade })
    cidade: string;

  @CreateDateColumn()
    criadoEm: Date;

  @UpdateDateColumn()
    atualizadoEm: Date;

  // relacionamentos---------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToOne(() => Aprovado, (aprovado) => aprovado.lotadoEm)
  @JoinColumn({
    name: LotadoEmDBConstants.inscricao,
    referencedColumnName: AprovadosDBConstants.inscricao,
  })
    aprovadoNaLotacao: Aprovado;

  @ManyToOne(() => Lotacao, (lotacao) => lotacao.aprovadosNaLotacao)
  @JoinColumn([
    { name: LotadoEmDBConstants.diretoria, referencedColumnName: LotacaoDBConstants.diretoria },
    { name: LotadoEmDBConstants.cidade, referencedColumnName: LotacaoDBConstants.cidade },
    { name: LotadoEmDBConstants.unidade, referencedColumnName: LotacaoDBConstants.unidade },
  ])
    lotacaoVinculada: Lotacao;
}
