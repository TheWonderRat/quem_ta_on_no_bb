import AbstractService from '../../../compartilhados/servico/ServicoAbstrato';

import {
  AppError,
} from '../../../compartilhados/erros/exporter';

import { 
  RequisicaoAtualizarTodos,RespostaAtualizarTodos 
} from '../../../tipos/servicos/atualizacao';

import { AprovadoRepo } from '../../../database/ORM/repositorio/exporter';

import { GerenciadorDeBots } from '../../../compartilhados/utilitarios/exporter'

export class ServicoAtualizarTodos extends AbstractService
  < RequisicaoAtualizarTodos, RespostaAtualizarTodos> {
  override async executar(
    parameters: RequisicaoAtualizarTodos,
  ): Promise< RespostaAtualizarTodos | AppError > {

      //  checa se o usuario existe na base de dados
    const { captcha, userAgent } = parameters;

    const aprovados = await AprovadoRepo.buscarTodos();

    // passa para o bot
    // TODO:: buscar melhores formas de tratamento de erros
    GerenciadorDeBots.atualizarListas( captcha, aprovados, userAgent)
      .then((ok) => {
        console.log(`chamado apos todos os aprovados serem atualizados!\n${ok}`)
      })
      .catch((err) =>{
        console.log(`erro em algum dos aprovados!:\n${err}`)
      });

        //  TODO:: retorna um token ao usuario
    return { mensagem: 'Token gerado com sucesso!' };  

  

    
    return { mensagem: 'miau' }
  }
}
