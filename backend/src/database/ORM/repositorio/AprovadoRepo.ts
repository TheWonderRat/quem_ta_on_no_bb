  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
//relacionamentos
import { Aprovado } from '../modelo/exporter';

 class AprovadoRepo extends Repository<Aprovado> {

  public async buscarPorLogin(inscricao: number): Promise<Aprovado | null>{
      const user = await this.findOne({ where: { inscricao } });

      return user;
  }

  public async cadastrarAprovado(
      inscricao: number,
      nome: string,
      senha: string,
      situacao: string,
      turma: number,
      ativado: boolean
    ): Promise<void>{

      const aprovado = this.criarAprovado(inscricao,nome,senha,situacao,turma,ativado);
      await this.manager.save(aprovado);
  }

  public criarAprovado(
      inscricao: number,
      nome: string,
      senha: string,
      situacao: string,
      turma: number,
      ativado: boolean
    ): Aprovado{
      const aprovado = this.manager.create(Aprovado);
      aprovado.inscricao = inscricao;
      aprovado.nome = nome;
      aprovado.senha = senha;
      aprovado.turma = turma;
      aprovado.situacao = situacao;
      aprovado.ativado = ativado;
      return aprovado;
  }
}

 export default new AprovadoRepo(Aprovado, dataSource.manager);
 
