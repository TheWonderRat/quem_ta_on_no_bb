//  libraries
import { In, LessThan, Not,Repository } from 'typeorm';

//ORM
import dataSource from '../../config';
//  entity
//  relacionamentos
import { Aprovado } from '../modelo/exporter';
import TurmaRepo from './TurmaRepo';

import { valoresPadrao } from '../../../SSOT/base_de_dados/exporter';

 class AprovadoRepo extends Repository<Aprovado> {
  //-----------------------------------buscar por Lotacao
  public async buscarPorPosicaoAmpla(posicao: number): Promise<Aprovado | null>{
      const user = await this.findOne({ where: { posicao } });

      return user;
  }

  public async cadastrarAprovado(
      posicao: number,
      inscricao: string,
      nome: string,
      senha: string,
      situacao: string,
      ppp: boolean,
      pcd: boolean,
      ativado: boolean,
      turma?: number
    ): Promise<void> {

      const aprovado = this.criarAprovado(posicao, inscricao,nome,senha,situacao,ativado, ppp, pcd,turma);
      await this.manager.save(aprovado);
  }

  public criarAprovado(
      posicaoAmpla: number,
      inscricao: string,
      nome: string,
      senha: string,
      situacao: string,
      ppp: boolean,
      pcd: boolean,
      ativado: boolean,
      turma?: number
    ): Aprovado {
      const aprovado = this.manager.create(Aprovado);
      aprovado.posicao = posicaoAmpla;
      aprovado.inscricao = inscricao;
      aprovado.nome = nome.toLowerCase();
      aprovado.senha = senha;
      aprovado.turma = turma;
      aprovado.situacao = situacao;
      aprovado.ativado = ativado;
      aprovado.ppp = ppp;
      aprovado.pcd = pcd;
      return aprovado;
  }
//---------------------------------------buscar todos

  public async buscarPorNome(nome: string): Promise<Aprovado[]>{
      const user = await this
      .createQueryBuilder("apr")
      .where('apr.nome = LOWER(:nome)',{ nome })
      .getMany()

      return user;
  }


  public async buscarPorPosicoes(
    posicoes: number[],
  ): Promise<Aprovado[]>{
    //  pessoas atualizadas ha menos de um dia nao serao atualizadas novamente

    return await this
      .findBy({ 
        posicao: In(posicoes),
      });
  }


  public async buscarEmMudanca(
    diasAntes: number = 1
  ): Promise<Aprovado[]>{
    //  pessoas atualizadas ha menos de um dia nao serao atualizadas novamente
    const date = new Date();
    date.setTime(date.getTime() - diasAntes * 86_400_000)

    return await this
      .findBy({ 
        situacao: In([
          valoresPadrao.Situacao.ConvocacaoAutorizada,
          valoresPadrao.Situacao.ConvocacaoExpedida,
          valoresPadrao.Situacao.EmQualificacao
        ]),
        atualizadoEm: LessThan(date) 
      });
  }

  public async buscarTodos(
    //diasAntes: number = 0
  ):Promise<Aprovado[]>{
    return await this
      .createQueryBuilder('apr')
      .select()
      .orderBy('apr.posicao')
      .getMany()
  }

//---------------------------------------busca por situacao

  public async buscarPorSituacao(
    situacao: string 
  ): Promise<Aprovado[]> {
    
    return await this.findBy({ situacao: situacao })
  }

  public async buscarPorSituacoes(
    situacoes: string[],
  ): Promise<Aprovado[]>{

    return await this.findBy({ situacao: In(situacoes) });
  }

  public async buscarPorSitucoesExceto(
    situacoes: string[],
  ): Promise<Aprovado[]>{

    return await this.findBy({ situacao: Not(In(situacoes)) })
  }

  public async buscarPorSituacoesDistintas(): Promise<Aprovado[]>{
    return await this 
      .createQueryBuilder()
      .distinctOn(['Aprovado.situacao'])
      .getMany();
  }

//---------------------------------------busca por turma
    
  public async buscarPorTurma( 
    turma?: number 
  ): Promise<Aprovado[]> {
    
    const turmaSelecionada = await TurmaRepo.buscarTurma(turma);
    //  TODO::retornar apenas a turma de maior numero
    if( !turmaSelecionada ){
      return [];
    }
    return await this.find({ where: { turma: turmaSelecionada.numero }});
  }

  public async buscarPorTurmas(
    turmas: number[],
  ): Promise<Aprovado[]>{

    return await this.findBy({ situacao: In(turmas) });
  }

  public async buscarPorTurmasExceto(
    turmas: number[],
  ): Promise<Aprovado[]>{

    return await this.findBy({ turma: Not(In(turmas)) });
  }
}

export default new AprovadoRepo(Aprovado, dataSource.manager);
 
