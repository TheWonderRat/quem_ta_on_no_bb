  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
//relacionamentos
import { atributos, entidades, relacionamentos } from '../../../SSOT/base_de_dados/exporter';
import { Aprovado } from '../modelo/exporter';

 class AprovadoRepo extends Repository<Aprovado> {

  public async cadastrarAprovado(
      inscricao: number,
      nome: string,
      senha?: string,
      situacao?: string,
      turma?: number,
      ativado?: boolean
    ): Promise<void>{

      const aprovado = this.criarAprovado(inscricao,nome,senha,situacao,turma,ativado);
      await this.manager.save(aprovado);
  }

  public criarAprovado(
      inscricao: number,
      nome: string,
      senha?: string,
      situacao?: string,
      turma?: number,
      ativado?: boolean
    ): Aprovado{
      const aprovado = this.manager.create(Aprovado);
      aprovado.inscricao = inscricao;
      aprovado.nome = nome;
      if(senha){
          aprovado.senha = senha;
      }
      if(turma){
        aprovado.turma = turma;
      }
      if(situacao){
        aprovado.situacao = situacao;
      }
      if(ativado){
        aprovado.ativado = ativado;
      }
    return aprovado;
  }
}

 export default new AprovadoRepo(Aprovado, dataSource.manager);
 
