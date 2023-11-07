import { Aprovado } from '../../Aprovado/entity/Aprovado';
import { Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';


@Entity('lotacao')
export class Lotacao{

  @OneToMany(() => Aprovado, aprovado => aprovado.lotacao)
  @PrimaryColumn()
  id: number

  @Column()
  nome: string

  @Column()
  cidade: string
  
  @Column()
  createdAt: Date 

  @Column()
  updatedAt: Date 
}
