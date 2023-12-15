import { Entity, PrimaryColumn, OneToMany } from 'typeorm'
import { Cidade } from './exporter';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Estado)
export default class Estado{

  @PrimaryColumn({name: atributos.Estado.Nome})
  nome: string;

  /*-----------------------------join------------------------*/
  @OneToMany(() => Cidade,(cidade) => cidade.estadoVinculado)
//TODO:: inserir no arquivo de constantes
  cidadesVinculadas: Cidade[]
}
