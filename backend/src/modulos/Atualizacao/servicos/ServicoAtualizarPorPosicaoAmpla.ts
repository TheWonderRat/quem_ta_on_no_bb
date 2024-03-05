import AbstractService from '../../../compartilhados/servico/ServicoAbstrato';
import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import {
  AppError,
} from '../../../compartilhados/erros/exporter';
import { 
  RequisicaoAtualizarPorPosicaoAmpla, 
  RespostaAtualizarPorPosicaoAmpla
} from '../../../tipos/servicos/atualizacao';
import { GerenciadorDeBots } from '../../../compartilhados/utilitarios/exporter';


//  ERROS: tipo de situacao nao existe

export class ServicoAtualizarPorPosicaoAmpla extends AbstractService
  < RequisicaoAtualizarPorPosicaoAmpla, RespostaAtualizarPorPosicaoAmpla > {
  override async executar(
    parameters: RequisicaoAtualizarPorPosicaoAmpla,
  ): Promise< RespostaAtualizarPorPosicaoAmpla| AppError > {
    //  checa se o usuario existe na base de dados
    const { captcha, userAgent, aprovados } = parameters;

    //  TODO:: selecionar apenas os que foram atualizados a mais de um dia
    const aprovadosP = await AprovadoRepo.buscarPorPosicoes( aprovados );

    // passa para o bot
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
