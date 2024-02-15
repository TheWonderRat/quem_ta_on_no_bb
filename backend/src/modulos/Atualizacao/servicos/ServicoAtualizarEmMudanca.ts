import AbstractService from '../../../compartilhados/servico/ServicoAbstrato';
import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';
import {
  AppError,
} from '../../../compartilhados/erros/exporter';
import { 
  RequisicaoAtualizarEmMudanca, 
  RespostaAtualizarEmMudanca
} from '../../../tipos/servicos/atualizacao';
import { GerenciadorDeBots } from '../../../compartilhados/utilitarios/exporter';


//  ERROS: tipo de situacao nao existe

export class ServicoAtualizarEmMudanca extends AbstractService
  < RequisicaoAtualizarEmMudanca, RespostaAtualizarEmMudanca> {
  override async executar(
    parameters: RequisicaoAtualizarEmMudanca,
  ): Promise< RespostaAtualizarEmMudanca| AppError > {
    //  checa se o usuario existe na base de dados
    const { captcha, userAgent } = parameters;

    //  TODO:: selecionar apenas os que foram atualizados a mais de um dia
    const aprovados = await AprovadoRepo.buscarEmMudanca();

    // passa para o bot
    //  TODO:: buscar melhores formas de tratamento de erros
    GerenciadorDeBots.atualizarListas( captcha, aprovados, userAgent)
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
