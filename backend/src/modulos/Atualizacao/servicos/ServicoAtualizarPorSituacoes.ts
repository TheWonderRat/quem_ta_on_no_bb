import AbstractService from '../../../compartilhados/servico/ServicoAbstrato';
import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import {
  AppError,
} from '../../../compartilhados/erros/exporter';
import { 
  RequisicaoAtualizarPorSituacao, 
  RespostaAtualizarPorSituacao
} from '../../../tipos/servicos/atualizacao';
import { GerenciadorDeBots } from '../../../compartilhados/utilitarios/exporter';
//  ERROS: tipo de situacao nao existe
export class ServicoAtualizarPorSituacoes extends AbstractService
  < RequisicaoAtualizarPorSituacao, RespostaAtualizarPorSituacao> {
  override async executar(
    parameters: RequisicaoAtualizarPorSituacao,
  ): Promise< RespostaAtualizarPorSituacao| AppError > {
    //  checa se o usuario existe na base de dados
    const { captcha, userAgent, situacoes } = parameters;
    //  TODO:: selecionar apenas os que foram atualizados a mais de um dia
    const aprovadosP = await AprovadoRepo.buscarPorSituacoes( situacoes );
    //  TODO:: buscar melhores formas de tratamento de erros
    GerenciadorDeBots.atualizarListas( captcha, aprovadosP, userAgent)
      .then((ok) => {
        console.log("chamado apos todos os aprovados serem atualizados!")
      })
      .catch((err) => {
        console.log(`erro em algum dos aprovados!:\n${err}`)
      });

        //  TODO:: retorna um token ao usuario
    return { mensagem: 'Token gerado com sucesso!' };
  }
}
