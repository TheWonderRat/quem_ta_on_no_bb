"use strict";
// import { Aprovado } from '../entity/exporter';
// import { ListaRepository } from '../repository/exporter';
// type Request = {
//   pagina: number,
//   candidatos: number,
//   lista?: string,
//   // lotacao deve ser consultada no cliente por cidade e diretoria
//   cidade?: string,
//   diretoria?: string,
//   turma?: number,
//   situacao?: string
// };
// type Response = {
//   aprovados: Aprovado[],
// };
// /*
// Serviço que busca as listas conforme os parâmetros passados.
// A validação sempre e pelo celebrate
//   pagina, lista e candidatos sao obrigatórios.
//   situação, cidade, diretoria, cidade e turma sao opcionais
//     candidatos: numero de candidatos que devem ser retornados
//     pagina: multiplicado pelo numero de candidatos, indica o numero de candidatos que deve
//       ser pulado na paginação
//       ex: 1 * 20 candidatos = a consulta começa a partir do numero 21 e vai ate o 40
//     candidatos e pagina sao usados para a paginação, que e calculada como candidato * paginas
//     tipoLista: faz a seleção dos candidatos com base na lista consultada os tipos de lista sao:
//       ampla, ampla_direta, ampla_cadastro_reserva,
//       pcd, pcd_diretas, pcd_cadastro_reserva,
//       ppp, ppp_cadastro_reserva, pp_diretas
//       tres_para_um, quatro_para_um
//     cidade: obtida da join de lotação, seleciona apenas os candidatos lotados naquela cidade
//       atualmente as opções sao: Brasilia, Sao paulo
//     diretoria: obtida da join de lotação, seleciona apenas os candidatos lotados naquela diretoria
//       atualmente as opções sao: DITEC,UAN,UCF
//     situação: atributo de candidato que referencia a relação 'situação'. seleciona apenas os
//       candidatos que estão naquela situação.
//       atualmente as opções sao:
//         em_preparação, convocação_expedida, qualificado,empossado, desistente,cancelado_por_prazo,
//         nao_convocado, fila_de_espera, inapto_ou_outros_motivos
//     turma: obtida da join de lotação, seleciona apenas os candidatos lotados naquela diretoria
//       atualmente as opções sao: DITEC,UAN,UCF
//  A validação dos dados e feita pelo celebrate
//  */
// // TODO:: Estabelecer numero maximo de candidatos consultados
// class ListarService {
//   // not sure if I should use any here...
//   public static async execute(
//     // situacao
//     { pagina, candidatos, lista, situacao, cidade, diretoria, turma }: Request,
//   ):
//     Promise<Response> {
//     const aprovados = await ListaRepository
//       .findByLista(pagina, candidatos, lista, situacao, cidade, diretoria, turma);
//     return { aprovados };
//   }
// }
// export default ListarService;
