import { Entity, Column, PrimaryColumn, ManyToMany, } from 'typeorm'

//TODO:: inserir no arquivo de constantes
@Entity('situacao')
export default class Situacao{

  @PrimaryColumn()
  nome: string;
}
