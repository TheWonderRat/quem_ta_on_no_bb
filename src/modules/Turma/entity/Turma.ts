import { Aprovado } from '../../Aprovado/entity/Aprovado';
import { Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';

@Entity('turma')
export class Turma{
  
    @PrimaryColumn()
    @OneToMany(() => Aprovado, aprovado => aprovado.turma)
    id: number

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}
