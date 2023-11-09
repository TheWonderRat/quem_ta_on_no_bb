import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Aprovado from '../../Aprovado/entity/Aprovado';

@Entity('turma')
export default class Turma {
  @PrimaryColumn()
  @OneToMany(() => Aprovado, (aprovado) => aprovado.turma)
    id: number;

  @Column()
    createdAt: Date;

  @Column()
    updatedAt: Date;
}
