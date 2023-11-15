import { Entity, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, Column, OneToOne } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado';

import AprovadosDBConstants from '../../Aprovado/constants/AprovadosDBConstants';
import LotadoEmDBConstants from '../constants/LotadoEmDBConstants';
import { Lotacao } from '../../Lotacao/entity/Lotacao';
import LotacaoDBConstants from '../../Lotacao/constants/LotacaoDBConstants';

@Entity(LotadoEmDBConstants.NomeEntidade)
export class LotadoEm {
// atributos---------------------------------
  @PrimaryColumn({ type: 'bigint', name: LotadoEmDBConstants.Inscricao })
    inscricao: number;

  @Column({ name: LotadoEmDBConstants.Unidade })
    unidade: number;

  @Column({ name: LotadoEmDBConstants.Diretoria })
    diretoria: string;

  @Column({ name: LotadoEmDBConstants.Cidade })
    cidade: string;

  @CreateDateColumn()
    criadoEm: Date;

  @UpdateDateColumn()
    atualizadoEm: Date;

  // relacionamentos---------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToOne(() => Aprovado, (aprovado) => aprovado.lotadoEm)
  @JoinColumn({
    name: LotadoEmDBConstants.Inscricao,
    referencedColumnName: AprovadosDBConstants.Inscricao,
  })
    aprovadoNaLotacao: Aprovado;

  @ManyToOne(() => Lotacao, (lotacao) => lotacao.aprovadosNaLotacao)
  @JoinColumn([
    { name: LotadoEmDBConstants.Diretoria, referencedColumnName: LotacaoDBConstants.Diretoria },
    { name: LotadoEmDBConstants.Cidade, referencedColumnName: LotacaoDBConstants.Cidade },
    { name: LotadoEmDBConstants.Unidade, referencedColumnName: LotacaoDBConstants.Unidade },
  ])
    lotacaoVinculada: Lotacao;
}
