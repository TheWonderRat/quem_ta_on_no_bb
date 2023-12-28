  //libraries
 import { TipoTurma } from '../../../tipos/repositorios/turma';
import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
//relacionamentos
import { Aprovado } from '../modelo/exporter';
import TurmaRepo from './TurmaRepo';

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

    public async buscarPorTurma( 
      turma : TipoTurma
    ): Promise<Aprovado[]> {

      if (turma === "ultima") {
        const turma = await TurmaRepo.buscarTurma("ultima");
        return await this.find({ where: { turma: turma?.numero }})
      }

    return await this.find({ where: { turma: turma }});
    }

}

 export default new AprovadoRepo(Aprovado, dataSource.manager);
 
