import { Cidade, Diretoria, LotadoEm } from './exporter';
import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne, OneToOne, JoinColumn, OneToMany, } from 'typeorm'
import { atributos, entidades } from '../../../SSOT/migracoes/exporter';

@Entity(entidades.Lotacao)
export default class Lotacao{

  @PrimaryColumn({name: atributos.Lotacao.Cidade})
  cidade: string;

  @PrimaryColumn({name: atributos.Lotacao.Estado})
  estado: string;

  @PrimaryColumn({name: atributos.Lotacao.Diretoria})
  diretoria: string

  /*-----------------------------joins----------------------------------*/

  @OneToMany(() => LotadoEm, (lotadoEm) => lotadoEm.lotacao)
  aprovadosNaLotacao: LotadoEm[] 

  @ManyToOne(() => Cidade, (cidade) => cidade.lotacoes )
  //TODO:: criar constantes para as joins tambem
  @JoinColumn([
    {name: atributos.Lotacao.Cidade, referencedColumnName: atributos.Cidade.Nome},
    {name:atributos.Lotacao.Estado, referencedColumnName: atributos.Cidade.Estado},
  ])
  cidadeVinculada: Cidade

  //TODO:: criar constantes para as joins tambem
  @ManyToOne(() => Diretoria, (diretoria) => diretoria.lotacoesVinculadas)
  @JoinColumn({name: atributos.Lotacao.Diretoria, referencedColumnName: atributos.Diretoria.Nome})
  diretoriaVinculada: Diretoria

}
