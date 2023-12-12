import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('contato')
export default class Contato{

  @PrimaryColumn()
  inscricao: number;

  @Column()
  celular: number;

  @Column()
  email: string
}
