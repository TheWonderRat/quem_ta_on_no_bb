import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Aprovado } from '../../Aprovado/entity/Aprovado';

@Entity('lotacao')
export class Lotacao {
  @OneToMany(() => Aprovado, (aprovado) => aprovado.lotacao)
  @PrimaryColumn()
    id: number;

  @Column()
    nome: string;

  @Column()
    cidade: string;

  @Column()
    createdAt: Date;

  @Column()
    updatedAt: Date;
}
