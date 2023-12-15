  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, Ranking } from '../modelo/exporter'
//relacionamentos
import { atributos, entidades, relacionamentos } from '../../../SSOT/base_de_dados/exporter';

 class RankingRepo extends Repository<Ranking> {
  public async cadastrarRanking(inscricao: number,posicao: number,tipoRanking: string): Promise<void>{
    const ranking = this.criarRanking(inscricao, posicao, tipoRanking);
    await this.manager.save(ranking);
  }

  public criarRanking(inscricao: number,posicao: number,tipoRanking: string): Ranking{
    const ranking = dataSource.manager.create(Ranking);

    ranking.inscricao = inscricao;
    ranking.tipoRanking = tipoRanking;
    ranking.posicao = posicao;

    return ranking;
  }

   public async findByLista(
     pagina: number,
     candidatos: number,
     ranking?: string,
     situacao?: string,
     cidade?: string,
     diretoria?: string,
     turma?: number,
   ): Promise<Aprovado[]> {
     const params = ['apr.nome', 'apr.ppp', 'apr.pcd', 'lista.posicao', 'lista.tipo'];

      //todas as joins devem estar antes de where
     let qr = dataSource 
        //apr e o alias da entidade "Aprovado" na query, nao e necessario usar template literals
       .createQueryBuilder(Aprovado, 'apr')
       .innerJoinAndSelect(
            `apr.${relacionamentos.Aprovado.RankingsDoAprovado}`,
            `apr.${entidades.Ranking}`,
            `apr.${atributos.Aprovado.Inscricao} = ${entidades.Ranking}.${atributos.Ranking.Inscricao}`,
       );

     if (cidade || diretoria) {
       qr = qr.innerJoinAndSelect(
          `apr.${relacionamentos.Aprovado.LotadoEm}`,
          `${entidades.LotadoEm}`,
          `apr.${atributos.Aprovado.Inscricao} = ${entidades.LotadoEm}.${atributos.LotadoEm.Inscricao}`,
       );

       if (diretoria) {
         params.push(`${entidades.LotadoEm}.${atributos.LotadoEm.Diretoria}`);
       }
       if (cidade) {
         params.push(`${entidades.LotadoEm}.${atributos.LotadoEm.Cidade}`);
       }
     }

     if (turma) {
       params.push(`apr.${atributos.Aprovado.Turma}`);
     }
     if (situacao) {
       params.push(`apr.${atributos.Aprovado.Situacao}`);
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
     const aprovados: Aprovado[] = await qr
       .orderBy(`${atributos.Ranking.Posicao}`, 'ASC')
       .offset(candidatos * pagina)
       .limit(candidatos)
       .getRawMany();

      //usa-se getMany() para que o orm serialize cada uma das instancias da join
      //seria possivel consultar mais de uma lista simultaneamente

     return aprovados;
   }
 }

 export default new RankingRepo(Ranking, dataSource.manager);
