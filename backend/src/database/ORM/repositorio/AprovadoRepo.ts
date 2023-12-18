  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
//relacionamentos
import { Aprovado } from '../modelo/exporter';

 class AprovadoRepo extends Repository<Aprovado> {

  public async buscarPorPosicaoAmpla(posicao: number): Promise<Aprovado | null>{
      const user = await this.findOne({ where: { posicao } });

      return user;
  }

  public async cadastrarAprovado(
      inscricao: number,
      nome: string,
      senha: string,
      situacao: string,
      ppp: boolean,
      pcd: boolean,
      ativado: boolean,
      turma?: number
    ): Promise<void>{

      const aprovado = this.criarAprovado(inscricao,nome,senha,situacao,ativado, ppp, pcd,turma);
      await this.manager.save(aprovado);
  }

  public criarAprovado(
      posicaoAmpla: number,
      nome: string,
      senha: string,
      situacao: string,
      ppp: boolean,
      pcd: boolean,
      ativado: boolean,
      turma?: number
    ): Aprovado{
      const aprovado = this.manager.create(Aprovado);
      aprovado.posicao = posicaoAmpla;
      aprovado.nome = nome;
      aprovado.senha = senha;
      aprovado.turma = turma;
      aprovado.situacao = situacao;
      aprovado.ativado = ativado;
      aprovado.ppp = ppp;
      aprovado.pcd = pcd;
      return aprovado;
  }
}

 export default new AprovadoRepo(Aprovado, dataSource.manager);
 
