import { Entity, PrimaryColumn, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Lotacao } from '../../Lotacao/entity/Lotacao';
import CidadeDBConstants from '../constants/CidadeDBConstants';

@Entity(CidadeDBConstants.NomeEntidade)
export class Cidade {
  // atributos---------------------------------------------------
  @PrimaryColumn({ name: CidadeDBConstants.NomeCidade, type: 'text' })
    nome: string;

  @CreateDateColumn({ name: CidadeDBConstants.CriadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: CidadeDBConstants.AtualizadoEm })
    atualizadoEm: Date;

  // relacionamentos---------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Lotacao, (lotacao) => lotacao.cidadeVinculada)
  @JoinColumn({
    name: CidadeDBConstants.NomeCidade,
  })
    lotacoesVinculadas: Lotacao[];
}
