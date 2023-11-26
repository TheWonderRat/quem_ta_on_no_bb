"use strict";
// // libraries
// import { Repository } from 'typeorm';
// // ORM
// import myDataSource from '../../database/typeorm';
// // entity
// import { Aprovado, Lista } from '../entity/exporter';
// // SSOT
// import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';
// import LotadoEmDBConstants from '../../SSOT/LotadoEmDBConstants';
// import ListaDBConstants from '../../SSOT/ListaDBConstants';
// class ListaRepository extends Repository<Lista> {
//   public async findByLista(
//     pagina: number,
//     candidatos: number,
//     lista?: string,
//     situacao?: string,
//     cidade?: string,
//     diretoria?: string,
//     turma?: number,
//   ): Promise<Aprovado[]> {
//     const params = ['apr.nome', 'apr.ppp', 'apr.pcd', 'lista.posicao', 'lista.tipo'];
//     // todas as joins devem estar antes de where
//     let qr = myDataSource
//       // apr e o alias da entidade "Aprovado" na query, nao e necessario usar template literals
//       .createQueryBuilder(Aprovado, 'apr')
//       .innerJoinAndSelect(
//         /*
//           "apr.inscricao",
//           "lista",
//           'apr.inscricao = lista.inscricao'
//         */
//         `apr.${AprovadosDBConstants.aprovadosNasListas}`,
//         `${ListaDBConstants.nomeEntidade}`,
//         `apr.${AprovadosDBConstants.inscricao} = ${ListaDBConstants.nomeEntidade}.${ListaDBConstants.inscricao}`,
//       );
//     if (cidade || diretoria) {
//       qr = qr.innerJoinAndSelect(
//         `apr.${AprovadosDBConstants.lotadoEm}`,
//         `${LotadoEmDBConstants.nomeEntidade}`,
//         `apr.${AprovadosDBConstants.inscricao} = ${LotadoEmDBConstants.nomeEntidade}.${LotadoEmDBConstants.inscricao}`,
//       );
//       if (diretoria) {
//         params.push(`${LotadoEmDBConstants.nomeEntidade}.${LotadoEmDBConstants.diretoria}`);
//       }
//       if (cidade) {
//         params.push(`${LotadoEmDBConstants.nomeEntidade}.${LotadoEmDBConstants.cidade}`);
//       }
//     }
//     if (turma) {
//       params.push(`apr.${AprovadosDBConstants.turma}`);
//     }
//     if (situacao) {
//       params.push(`apr.${AprovadosDBConstants.situacao}`);
//     }
//     // deve haver pelo menos um where antes de cada andWhere
//     qr = qr.select(params).where(`${ListaDBConstants.tipoLista} = :lista`, { lista });
//     if (diretoria) {
//       qr = qr.andWhere(`${LotadoEmDBConstants.diretoria} = :diretoria`, { diretoria });
//     }
//     if (cidade) {
//       qr = qr.andWhere(`${LotadoEmDBConstants.cidade} = :cidade`, { cidade });
//     }
//     if (turma) {
//       qr = qr.andWhere(`apr.${AprovadosDBConstants.turma}= :turma`, { turma });
//     }
//     if (situacao) {
//       qr = qr.andWhere(`apr.${AprovadosDBConstants.situacao}= :situacao`, { situacao });
//     }
//     // criterios de ordenacao nao podem vir antes das outras clausulas
//     // ou os filtros nao funcionarao
//     // considerando que a consulta depende da conexao e as queries funcional, o maximo que acontece
//     const aprovados: Aprovado[] = await qr
//       .orderBy(`${ListaDBConstants.posicao}`, 'ASC')
//       .offset(candidatos * pagina)
//       .limit(candidatos)
//       .getRawMany();
//       // const aprovados: Aprovado[] = [];
//     // usa-se getMany() para que o orm serialize cada uma das instancias da join
//     // seria possivel consultar mais de uma lista simultaneamente
//     return aprovados;
//   }
// }
// export default new ListaRepository(Lista, myDataSource.manager);
