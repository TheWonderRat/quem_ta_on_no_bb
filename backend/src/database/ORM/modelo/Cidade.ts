import { Estado, Lotacao } from '../modelo/exporter';
import { Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn, } from 'typeorm'
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Cidade)
export default class Cidade{

  @PrimaryColumn({name: atributos.Cidade.Nome})
  nome: string;

//TODO:: inserir no arquivo de constantes
  @PrimaryColumn({name: atributos.Cidade.Estado})
  estado: string;

  //-------------------------joins-------------------------------//

  @OneToMany(() => Lotacao, (lotacao) => lotacao.cidadeVinculada )
  lotacoesVinculadas: Lotacao[]

  @ManyToOne(() => Estado, (estado) => estado.cidadesVinculadas)
  @JoinColumn({name: atributos.Cidade.Estado, referencedColumnName: atributos.Estado.Nome})
  estadoVinculado: Estado
}
