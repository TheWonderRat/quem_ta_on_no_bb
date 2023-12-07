import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado';
import { TipoLista } from '../../TipoLista/entity/TipoLista';

@Entity('lista')
export default class Lista {
  @PrimaryColumn({ type: 'bigint' })
  @ManyToMany(() => Aprovado, (aprovado) => aprovado.inscricao)
    inscricao: number;

  @PrimaryColumn()
  @ManyToOne(() => TipoLista, (tipoLista) => tipoLista.nome)
    tipoLista: string;

  @PrimaryColumn()
    posicao: number;

  @Column()
    createdAt: Date;

  @Column()
    updatedAt: Date;
}