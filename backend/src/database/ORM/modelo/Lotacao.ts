import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('lotacao')
export default class Lotacao{

  @PrimaryColumn()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  diretoria: string
}
