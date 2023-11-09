import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Lista } from '../../Lista/entity/Lista';

@Entity('tipo_lista')
export class TipoLista {
  @OneToMany(() => Lista, (lista) => lista.tipoLista)
  @PrimaryColumn()
    nome: string;

  @Column()
    createdAt: Date;

  @Column()
    updatedAt: Date;
}
