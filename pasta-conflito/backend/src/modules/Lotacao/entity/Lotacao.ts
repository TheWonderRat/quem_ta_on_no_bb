import { Entity, ManyToOne, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, Column, OneToOne, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import LotacaoDBConstants from '../constants/LotacaoDBConstants';
import { Cidade } from '../../Cidade/entity/Cidade';
import { Diretoria } from '../../Diretoria/entity/Diretoria';
import DiretoriaDBConstants from '../../Diretoria/constants/DiretoriaDBConstants';
import CidadeDBConstants from '../../Cidade/constants/CidadeDBConstants';
import { LotadoEm } from '../../LotadoEm/entity/LotadoEm';

@Entity(LotacaoDBConstants.NomeEntidade)
export class Lotacao {
// atributos---------------------------------
  @PrimaryColumn({ type: 'integer', name: LotacaoDBConstants.Unidade })
    unidade: number;

  @PrimaryColumn({ type: 'text', name: LotacaoDBConstants.Cidade })
    cidade: string;

  @PrimaryColumn({ type: 'text', name: LotacaoDBConstants.Diretoria })
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
    name: LotacaoDBConstants.Diretoria,
    referencedColumnName: DiretoriaDBConstants.NomeDiretoria,
  })
    diretoriaVinculada: Diretoria;

  @ManyToOne(() => Cidade, (cidade) => cidade.lotacoesVinculadas)
  @JoinColumn({
    name: LotacaoDBConstants.Cidade,
    referencedColumnName: CidadeDBConstants.NomeCidade,
  })
    cidadeVinculada:Cidade;
}
