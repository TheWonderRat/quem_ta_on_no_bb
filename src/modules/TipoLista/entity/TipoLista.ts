import { Entity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Lista } from '../../Lista/entity/Lista'
import TipoListaDBConstants from '../constants/TipoListaDBConstants';




@Entity(TipoListaDBConstants.NomeEntidade)
export class TipoLista{

//atributos------------------------------------------------
  @PrimaryColumn({type: 'text', name: TipoListaDBConstants.TipoLista})
  //DEVE TER O MESMO NOME DA CONSTANTE DO ARQUIVO DE CONSTANTES
  tipo: string 

  @CreateDateColumn({name: TipoListaDBConstants.CriadoEm})
  criadoEm: Date

  @UpdateDateColumn({name: TipoListaDBConstants.AtualizadoEm})
  atualizadoEm: Date 

//relacionamentos------------------------------------------------
//relacioinamentos devem ter o mesmo nome da  variavel da entidade

  @OneToMany(() => Lista, (lista) => lista.tipo)
  @JoinColumn({name: TipoListaDBConstants.TipoLista})
  listasVinculadas: Lista[];
 
}
