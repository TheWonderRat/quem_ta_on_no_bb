// libraries
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

// entity
import { TipoLista, Aprovado } from './exporter';

// SSOT
import ListaDBConstants from '../../SSOT/ListaDBConstants';
import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';

@Entity(ListaDBConstants.nomeEntidade)
export default class Lista {
  // atributos------------------------------------------------
  @PrimaryColumn({
    type: 'bigint',
    name: ListaDBConstants.inscricao,
    primaryKeyConstraintName: 'pk_lista',
  })
    inscricao: number;

  @PrimaryColumn({ type: 'integer', primaryKeyConstraintName: 'pk_lista' })
    posicao: number;

  @PrimaryColumn({ type: 'text', primaryKeyConstraintName: 'pk_lista' })
    tipo: string;

  @CreateDateColumn()
    criadoEm: Date;

  @UpdateDateColumn()
    atualizadoEm: Date;

  // relacionamentos-----------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade

  @ManyToOne(() => Aprovado, (aprovado) => aprovado.aprovadoNasListas)
  @JoinColumn({
    name: ListaDBConstants.inscricao,
    // Nao gera o bug
    // descomentar essa linha da problema
    referencedColumnName: AprovadosDBConstants.inscricao,
  })
    aprovadoVinculado: Aprovado;

  @ManyToOne(() => TipoLista, (tipoLista) => tipoLista.listasVinculadas)
  @JoinColumn({ name: ListaDBConstants.tipoLista })
    listaVinculada: TipoLista;
}
