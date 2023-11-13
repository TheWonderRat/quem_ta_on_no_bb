import AppError from '@shared/errors/AppError';
import { Aprovado } from '@modules/Aprovado/entity/Aprovado';
import { PostgresDataSource } from '@shared/typeorm/index';
import AprovadosDBConstants from '@modules/Aprovado/constants/AprovadosDBConstants';
import LotacaoDBConstants from '@modules/Lotacao/constants/LotacaoDBConstants';
import LotadoEmDBConstants from '@modules/LotadoEm/constants/LotadoEmDBConstants';
import ListaDBConstants from '../constants/ListaDBConstants';
import { ListasRepo } from '../repository/ListaRepository';

interface IRequest {
  pagina: number,
  candidatos: number,
  lista?: string,
  // lotacao deve ser consultada no cliente por cidade e diretoria
  cidade?: string,
  diretoria?: string,
  turma?: number,
  situacao?: string
}

interface IResponse {
  aprovados: Aprovado[],
  // message: string
}

/*
Servico que busca as listas conforme os parametros passados.
A validacao sempre e pelo celebrate
  pagina, lista e candidatos sao obrigatorios.
  situacao, cidade, diretoria, cidade e turma sao opcionais

    candidatos: numero de candidatos que devem ser retornados
    pagina: multiplicado pelo numero de candidatos, indica o numero de candidatos que deve
      ser pulado na paginacao
      ex: 1 * 20 candidatos = a consulta comeca a partir do numero 21 e vai ate o 40
    candidatos e pagina sao usados para a paginacao, que e calculada como candidato * paginas

    tipoLista: faz a selecao dos candidatos com base na lista consultada os tipos de lista sao:
      ampla, ampla_direta, ampla_cadastro_reserva,
      pcd, pcd_diretas, pcd_cadastro_reserva,
      ppp, ppp_cadastro_reserva, pp_diretas
      tres_para_um, quatro_para_um

    cidade: obtida da join de lotacao, seleciona apenas os candidatos lotados naquela cidade
      atualmente as opcoes sao: Brasilia, Sao paulo
    diretoria: obtida da join de lotacao, seleciona apenas os candidatos lotados naquela diretoria
      atualmente as opcoes sao: DITEC,UAN,UCF
    situacao: atributo de candidato que referencia a relacao 'situacao'. seleciona apenas os
      candidatos que estao naquela situacao.
      atualmente as opcoes sao:
        em_preparacao, convocacao_expedida, qualificado,empossado, desistente,cancelado_por_prazo,
        nao_convocado, fila_de_espera, inatpto_ou_outros_motivos
    turma: obtida da join de lotacao, seleciona apenas os candidatos lotados naquela diretoria
      atualmente as opcoes sao: DITEC,UAN,UCF

 A validacao dos dados e feita pelo celebrate
 */
// TODO:: Estabelecer numero maximo de candidatos consultados
class ListarService {
  // not sure if I should use any here...
  public async execute(
    // situacao
    { pagina, candidatos, lista, situacao, cidade, diretoria, turma }: IRequest,
  ):
    Promise<IResponse | AppError> {
    const aprovados = await ListasRepo.findByLista(pagina, candidatos, lista, situacao, cidade, diretoria, turma);
    return { aprovados };
  }
}

/*
function queryCidadeOuDiretoria(query: SelectQueryBuilder<Aprovado>): SelectQueryBuilder<Aprovado>{

}

function queryTurma(): SelectQueryBuilder<Aprovado>{

}

function querySituacao(): SelectQueryBuilder<Aprovado>{

}
*/

export default ListarService;
