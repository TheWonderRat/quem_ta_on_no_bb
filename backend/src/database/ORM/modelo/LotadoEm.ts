import { Lotacao } from './exporter';
import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Aprovado } from './exporter';
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';


//TODO:: Inserir nome no arquivo de constantes
@Entity(entidades.LotadoEm)
export default class LotadoEm{

  @PrimaryColumn({name: atributos.LotadoEm.Inscricao})
  inscricao:number 

  @PrimaryColumn({name: atributos.LotadoEm.Cidade})
  cidade: string

  @PrimaryColumn({name: atributos.LotadoEm.Estado})
  estado: string

  @PrimaryColumn({name: atributos.LotadoEm.Diretoria})
  diretoria: string

  /*-----------------------------join-------------------------------*/

  @OneToOne(() => Aprovado, (aprovado) => aprovado.lotadoEm)
  @JoinColumn({name: atributos.LotadoEm.Inscricao ,referencedColumnName: atributos.Aprovado.Inscricao})
  aprovadoVinculado: Aprovado

  @ManyToOne(() => Lotacao, (lotacao) => lotacao.aprovadosNaLotacao ) 
  @JoinColumn([
  //TODO:: inserir o nome no arquivo de constantes
    {name: atributos.LotadoEm.Cidade,referencedColumnName: atributos.Lotacao.Cidade},
    {name: atributos.LotadoEm.Estado,referencedColumnName: atributos.Lotacao.Estado},
    {name: atributos.LotadoEm.Diretoria,referencedColumnName: atributos.Lotacao.Diretoria},
  ])
  lotacao: Lotacao

}