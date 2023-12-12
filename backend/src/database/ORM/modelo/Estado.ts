import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('aprovado')
export default class Aprovado{

  @PrimaryColumn()
  nome: string;
}
