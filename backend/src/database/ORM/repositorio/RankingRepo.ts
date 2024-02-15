  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, Ranking } from '../modelo/exporter'
//relacionamentos
import { atributos, entidades, relacionamentos, valoresPadrao } from '../../../SSOT/base_de_dados/exporter';

 class RankingRepo extends Repository<Ranking> {
  public async cadastrarRanking(posicaoAmpla: number,posicao: number,tipoRanking: string): Promise<void>{
    const ranking = this.criarRanking(posicaoAmpla, posicao, tipoRanking);
    await this.manager.save(ranking);
  }

  public criarRanking(posicaoAmpla: number,posicao: number,tipoRanking: string): Ranking{
    const ranking = dataSource.manager.create(Ranking);

    ranking.posicao= posicaoAmpla;
    ranking.tipoRanking = tipoRanking;
    ranking.posicaoNoRanking = posicao;

    return ranking;
  }

  public async buscarPorPosicaoAmpla(posicao: number): Promise<Ranking[] | null>{
      const rankings = await this.find({ where: { posicao } });

      return rankings 
  }


  public async buscarPorPosicaoAmplaELista(posicao: number, tipoRanking: valoresPadrao.TipoRanking): Promise<Ranking | null>{
      const ranking = await this.findOne({ where: { posicao , tipoRanking } });

      return ranking 
  }
  

   public async buscarPorRanking(
     ranking: string,
     pagina?: number,
     candidatos?: number,
     situacao?: string,
     diretoria?: string,
     cidade?: string,
     turma?: number,
   ): Promise<Aprovado[]> {

    const ALIAS_APROVADO = 'apr'
      // TODO:: criar constantes para obedecer aos tipos de resposta
     const params = [
        `${ALIAS_APROVADO}.${atributos.Aprovado.Nome} as nome`,
        `${ALIAS_APROVADO}.${atributos.Aprovado.PPP} as ppp`,
        `${ALIAS_APROVADO}.${atributos.Aprovado.PCD} as pcd`,
        `${entidades.Ranking}.${atributos.Ranking.Posicao} as posicao`,
        `${entidades.Ranking}.${atributos.Ranking.TipoRanking} as ranking`,
      ];

      //todas as joins devem estar antes de where
     let qr = dataSource 
        //apr e o alias da entidade "Aprovado" na query, nao e necessario usar template literals
       //.createQueryBuilder(Aprovado, 'apr')
       .createQueryBuilder(Aprovado, 'apr')
       .innerJoinAndSelect(
            `apr.${relacionamentos.Aprovado.RankingsDoAprovado}`,
            `${entidades.Ranking}`,
            `apr.${atributos.Aprovado.PosicaoAmpla} = ${entidades.Ranking}.${atributos.Ranking.PosicaoAmpla}`,
       );

     if (cidade || diretoria) {
       qr = qr.innerJoinAndSelect(
          `apr.${relacionamentos.Aprovado.LotadoEm}`,
          `${entidades.LotadoEm}`,
          `apr.${atributos.Aprovado.PosicaoAmpla} = ${entidades.LotadoEm}.${atributos.LotadoEm.PosicaoAmpla}`,
       );

       if (diretoria) {
      // TODO:: criar constantes para obedecer aos tipos de resposta
         params.push(`${entidades.LotadoEm}.${atributos.LotadoEm.Diretoria} as diretoria`);
       }
       if (cidade) {
      // TODO:: criar constantes para obedecer aos tipos de resposta
         params.push(`${entidades.LotadoEm}.${atributos.LotadoEm.Cidade} as cidade`);
       }
     }

     if (turma) {
      // TODO:: criar constantes para obedecer aos tipos de resposta
      params.push(`apr.${atributos.Aprovado.Turma} as turma`);
     }
     if (situacao) {
      // TODO:: criar constantes para obedecer aos tipos de resposta
       params.push(`apr.${atributos.Aprovado.Situacao} as situacao`);
     }
      //deve haver pelo menos um where antes de cada andWhere
     qr = qr.select(params).where(`${atributos.Ranking.TipoRanking } = :ranking`, { ranking });

     if (diretoria) {
       qr = qr.andWhere(`${atributos.LotadoEm.Diretoria} = :diretoria`, { diretoria });
     }
     if (cidade) {
       qr = qr.andWhere(`${atributos.LotadoEm.Cidade} = :cidade`, { cidade });
     }
     if (turma) {
       qr = qr.andWhere(`apr.${atributos.Aprovado.Turma}= :turma`, { turma });
     }
     if (situacao) {
       qr = qr.andWhere(`apr.${atributos.Aprovado.Situacao}= :situacao`, { situacao });
     }

      //criterios de ordenacao nao podem vir antes das outras clausulas
      //ou os filtros nao funcionarao
      //considerando que a consulta depende da conexao e as queries funcional, o maximo que acontece
      qr = qr.orderBy(`${atributos.Ranking.Posicao}`, 'ASC');

      if ( pagina && candidatos ){
        qr = qr
          .offset(candidatos * pagina)
          .limit(candidatos);
      }


     const aprovados: Aprovado[] = await qr
       .getRawMany();
       // .offset(candidatos * pagina)
       // .limit(candidatos)

      //usa-se getMany() para que o orm serialize cada uma das instancias da join
      //seria possivel consultar mais de uma lista simultaneamente

     return aprovados;
   }
  public async buscarTotalDeEmpossados(){

    }

  public async buscarUltimaPessoaEmpossada(): Promise<Ranking | null>{
    return await this 
        //apr e o alias da entidade "Aprovado" na query, nao e necessario usar template literals
       //.createQueryBuilder(Aprovado, 'apr')
       .createQueryBuilder('rk')
       .innerJoinAndSelect(
            `rk.${relacionamentos.Ranking.AprovadoVinculado}`,
            `${entidades.Aprovado}`,
            `rk.${atributos.Ranking.PosicaoAmpla} = ${entidades.Aprovado}.${atributos.Aprovado.PosicaoAmpla}`,
     )
    .where(`${entidades.Aprovado}.${atributos.Aprovado.Situacao} =:situacao`, { situacao: valoresPadrao.Situacao.Empossado })
    //  reposicionar caso alguma coisa mude
    //.andWhere(`rk.${atributos.Ranking.TipoRanking} =:ranking`,{ ranking: valoresPadrao.TipoRanking.ListaDeChamada })
    .andWhere(`rk.${atributos.Ranking.TipoRanking} =:ranking`,{ ranking: valoresPadrao.TipoRanking.ListaDeChamada2 })
    .orderBy(`${atributos.Ranking.Posicao}`, 'DESC')
    .getOne();
  }

 }

 export default new RankingRepo(Ranking, dataSource.manager);
