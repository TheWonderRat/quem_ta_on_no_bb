/*
import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  OneToOne, 
  JoinColumn, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn 
} from 'typeorm'
import Aprovado from './Aprovado';
import { atributos, entidades } from '../../../SSOT/base_de_dados/exporter';

//TODO:: inserir no arquivo de constantes
@Entity(entidades.Contato)
export default class Notificacao{

  @PrimaryColumn({name: atributos.Contato.PosicaoAmpla})
  posicao: number;

  @Column({name: atributos.Notificacao.Tipo})
  tipo: string;

  @Column({name: atributos.Notificacao.Ativado})
  ativada: boolean

  @CreateDateColumn()
  criadoEm: Date

  @UpdateDateColumn()
  atualizadoEm: Date

  @DeleteDateColumn()
  excluidoEm: Date

  //--------------------------------join---------------------------------------

  @OneToOne(() => Aprovado,(usuario) => usuario.notificacoes)
  @JoinColumn({name: atributos.Contato.PosicaoAmpla, referencedColumnName: atributos.Aprovado.PosicaoAmpla})
  aprovadoVinculado: Aprovado 
  //---------------------------------setters
  public ativar(){

  }

  public desativar(){

  }

  //--------------------------------metodos

  public async notificar(){
    //usa o numero do aprovado vinculado para notificar
    switch(this.tipo){
      case 'ao_atualizar':
        break;
      case 'ao_atualizar_todos':
        break;
      case 'ao_mudar_situacao':
        break;
    }
  }

  protected async aoAtualizar(){
  }
  
  protected async aoAtualizarTodos(){
  }

  protected async aoMudarSituacao(){
  }
}
*/
