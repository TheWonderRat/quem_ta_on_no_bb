import { Entity, PrimaryColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, Column } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado';
import { TipoLista } from '../../TipoLista/entity/TipoLista';
import ListaDBConstants from '../constants/ListaDBConstants';
import AprovadosDBConstants from '../../Aprovado/constants/AprovadosDBConstants';

@Entity(ListaDBConstants.NomeEntidade)
export class Lista {
  // atributos------------------------------------------------
  @PrimaryColumn({
    type: 'bigint',
    name: ListaDBConstants.Inscricao,
    primaryKeyConstraintName: 'pk_lista',
  })
    inscricao: number;

  @PrimaryColumn({ type: 'integer', primaryKeyConstraintName: 'pk_lista' })
    posicao: number;

  @PrimaryColumn({ type: 'text', primaryKeyConstraintName: 'pk_lista' })
    tipo: string;

  @CreateDateColumn()
    criado_em: Date;

  @UpdateDateColumn()
    atualizado_em: Date;

  // relacionamentos-----------------------------------------------
  // relacionamentos devem ter o mesmo nome da variavel da entidade

  @ManyToOne(() => Aprovado, (aprovado) => aprovado.aprovadoNasListas)
  @JoinColumn({
    name: ListaDBConstants.Inscricao,
    // Nao gera o bug
    // descomentar essa linha da problema
    referencedColumnName: AprovadosDBConstants.Inscricao,
  })
    aprovadoVinculado: Aprovado;

  @ManyToOne(() => TipoLista, (tipoLista) => tipoLista.listasVinculadas)
  @JoinColumn({ name: ListaDBConstants.TipoLista })
    listaVinculada: TipoLista;
}
