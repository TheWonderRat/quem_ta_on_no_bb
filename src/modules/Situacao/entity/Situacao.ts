import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado';

@Entity('situacao')
export class Situacao {
  @OneToMany(() => Aprovado, (aprovado) => aprovado.situacao)
  @PrimaryColumn()
    nome: string;

  @Column()
    createdAt: Date;

  @Column()
    updatedAt: Date;
}
