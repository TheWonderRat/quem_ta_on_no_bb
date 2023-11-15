// libraries
import {
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// entity
import { Cidade } from './Cidade';
import { Diretoria } from './Diretoria';
import { LotadoEm } from './LotadoEm';

// SSOT
import LotacaoDBConstants from '../../SSOT/LotacaoDBConstants';
import DiretoriaDBConstants from '../../SSOT/DiretoriaDBConstants';
import CidadeDBConstants from '../../SSOT/CidadeDBConstants';

@Entity(LotacaoDBConstants.nomeEntidade)
export default class Lotacao {
// atributos---------------------------------
  @PrimaryColumn({ type: 'integer', name: LotacaoDBConstants.unidade })
    unidade: number;

  @PrimaryColumn({ type: 'text', name: LotacaoDBConstants.cidade })
    cidade: string;

  @PrimaryColumn({ type: 'text', name: LotacaoDBConstants.diretoria })
    diretoria: string;

  @CreateDateColumn()
    criadoEm: Date;

  @UpdateDateColumn()
    atualizadoEm: Date;

  // relacionamentos---------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => LotadoEm, (lotadoEm) => lotadoEm.lotacaoVinculada)
  /*
  @JoinColumn([
    {name: LotacaoDBConstants.Cidade , referencedColumnName: LotadoEmDBConstants.Cidade},
    {name: LotacaoDBConstants.Diretoria , referencedColumnName: LotadoEmDBConstants.Diretoria},
    {name: LotacaoDBConstants.Unidade , referencedColumnName: LotadoEmDBConstants.Unidade},
  ])
  */
    aprovadosNaLotacao: LotadoEm[];

  @ManyToOne(() => Diretoria, (diretoria) => diretoria.lotacoesVinculadas)
  @JoinColumn({
    name: LotacaoDBConstants.diretoria,
    referencedColumnName: DiretoriaDBConstants.nomeDiretoria,
  })
    diretoriaVinculada: Diretoria;

  @ManyToOne(() => Cidade, (cidade) => cidade.lotacoesVinculadas)
  @JoinColumn({
    name: LotacaoDBConstants.cidade,
    referencedColumnName: CidadeDBConstants.nomeCidade,
  })
    cidadeVinculada:Cidade;
}
