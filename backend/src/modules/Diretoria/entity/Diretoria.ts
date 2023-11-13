import { Entity, PrimaryColumn, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Lotacao } from '../../Lotacao/entity/Lotacao';
import DiretoriaDBConstants from '../constants/DiretoriaDBConstants';

@Entity(DiretoriaDBConstants.NomeEntidade)
export class Diretoria {
  // atributos------------------------------------------------------
  @PrimaryColumn({ type: 'text', name: DiretoriaDBConstants.NomeDiretoria })
    nome: string;

  @CreateDateColumn({ name: DiretoriaDBConstants.CriadoEm })
    criadoEm: Date;

  @UpdateDateColumn({ name: DiretoriaDBConstants.AtualizadoEm })
    atualizadoEm: Date;

  // relacionamentos------------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade
  @OneToMany(() => Lotacao, (lotacao) => lotacao.diretoriaVinculada)
  @JoinColumn({ name: DiretoriaDBConstants.NomeDiretoria })
    lotacoesVinculadas: Lotacao[];
}
