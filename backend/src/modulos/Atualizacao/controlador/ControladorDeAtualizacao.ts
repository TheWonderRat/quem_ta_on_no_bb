import { Request, Response } from 'express';
import { ServicoAtualizarEmMudanca } from '../servicos/ServicoAtualizarEmMudanca';
import { ServicoAtualizarTodos } from '../servicos/ServicoAtualizarTodos';
import { ServicoAtualizarPorPosicaoAmpla} from '../servicos/ServicoAtualizarPorPosicaoAmpla';
import { ServicoAtualizarPorSituacoes } from '../servicos/ServicoAtualizarPorSituacoes';

export default class ControladorDeAtualizacao{

  public async atualizarEmMudanca( request: Request, response: Response ) {
    console.log('atualizar');
    const atualizarEmMudanca = new ServicoAtualizarEmMudanca();
    const { captcha, userAgent } = request.body;
    const result = await atualizarEmMudanca.executar({ captcha, userAgent });
    return response.json(result);
  }

  public async atualizarTodos( request: Request, response: Response ) {
    console.log('atualizar');
    const atualizarTodos = new ServicoAtualizarTodos();
    const { captcha, userAgent } = request.body;
    const result = await atualizarTodos.executar({ captcha, userAgent });
    return response.json(result);
  }

  public async atualizarPorPosicaoAmpla( request: Request, response: Response ) {
    console.log('atualizar');
    const atualizarTodos = new ServicoAtualizarPorPosicaoAmpla();
    const { captcha, userAgent, aprovados } = request.body;
    const result = await atualizarTodos.executar({ captcha, userAgent, aprovados });
    return response.json(result);
  }

  public async atualizarPorSituacoes( request: Request, response: Response ) {
    console.log('atualizar');
    const atualizarTodos = new ServicoAtualizarPorSituacoes();
    const { captcha, userAgent, situacoes } = request.body;
    const result = await atualizarTodos.executar({ captcha, userAgent, situacoes });
    return response.json(result);
  }

}
