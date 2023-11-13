import { myDataSource } from '@shared/typeorm';
import { Aprovado } from '@modules/Aprovado/entity/Aprovado';
import { Repository } from 'typeorm';
import AprovadosDBConstants from '@modules/Aprovado/constants/AprovadosDBConstants';
import LotadoEmDBConstants from '@modules/LotadoEm/constants/LotadoEmDBConstants';
import ListaDBConstants from '../constants/ListaDBConstants';
import { Lista } from '../entity/Lista';

class ListaRepository extends Repository<Lista> {
  async findByLista(pagina: number, candidatos: number, lista?: string, situacao?: string, cidade?: string, diretoria?: string, turma?: number): Promise<Aprovado[]> {
    const params = [
      'apr.nome',
      'apr.ppp',
      'apr.pcd',
      'lista.posicao',
      'lista.tipo',
    ];

    // todas as joins devem estar antes de where
    let qr = myDataSource
      // apr e o alias da entidade "Aprovado" na query, nao e necessario usar template literals
      .createQueryBuilder(Aprovado, 'apr')
      .innerJoinAndSelect(
        /*
              "apr.inscricao",
              "lista",
              'apr.inscricao = lista.inscricao'
              */
        `apr.${AprovadosDBConstants.AprovadosNasListas}`,
        `${ListaDBConstants.NomeEntidade}`,
        `apr.${AprovadosDBConstants.Inscricao} = ${ListaDBConstants.NomeEntidade}.${ListaDBConstants.Inscricao}`,
      );

    if (cidade || diretoria) {
      qr = qr
        .innerJoinAndSelect(
          `apr.${AprovadosDBConstants.LotadoEm}`,
          `${LotadoEmDBConstants.NomeEntidade}`,
          `apr.${AprovadosDBConstants.Inscricao} = ${LotadoEmDBConstants.NomeEntidade}.${LotadoEmDBConstants.Inscricao}`,
        );

      if (diretoria) {
        params.push(`${LotadoEmDBConstants.NomeEntidade}.${LotadoEmDBConstants.Diretoria}`);
      }
      if (cidade) {
        params.push(`${LotadoEmDBConstants.NomeEntidade}.${LotadoEmDBConstants.Cidade}`);
      }
    }

    if (turma) {
      params.push(`apr.${AprovadosDBConstants.Turma}`);
    }
    if (situacao) {
      params.push(`apr.${AprovadosDBConstants.Situacao}`);
    }
    // deve haver pelo menos um where antes de cada andWhere
    qr = qr
      .select(params)
      .where(`${ListaDBConstants.TipoLista} = :lista`, { lista });

    if (diretoria) {
      qr = qr.andWhere(`${LotadoEmDBConstants.Diretoria} = :diretoria`, { diretoria });
    }
    if (cidade) {
      qr = qr.andWhere(`${LotadoEmDBConstants.Cidade} = :cidade`, { cidade });
    }
    if (turma) {
      qr = qr.andWhere(`apr.${AprovadosDBConstants.Turma}= :turma`, { turma });
    }
    if (situacao) {
      qr = qr.andWhere(`apr.${AprovadosDBConstants.Situacao}= :situacao`, { situacao });
    }

    // criterios de ordenacao nao podem vir antes das outras clausulas
    // ou os filtros nao funcionarao
    // considerando que a consulta depende da conexao e as queries funcional, o maximo que acontece
    const aprovados: Aprovado[] = await qr
      .orderBy(`${ListaDBConstants.Posicao}`, 'ASC')
      .offset(candidatos * pagina)
      .limit(candidatos)
      .getRawMany();
      // const aprovados: Aprovado[] = [];

    // usa-se getMany() para que o orm serialize cada uma das instancias da join
    // seria possivel consultar mais de uma lista simultaneamente

    return aprovados;
  }
}

export const ListasRepo = new ListaRepository(Lista, myDataSource.manager);
