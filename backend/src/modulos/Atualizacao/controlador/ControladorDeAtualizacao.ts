import { Request, Response } from 'express';
import { ServicoAtualizarEmMudanca } from '../servicos/ServicoAtualizarEmMudanca';
import { ServicoAtualizarTodos } from '../servicos/ServicoAtualizarTodos';

export default class ControladorDeAtualizacao{

  public async atualizarEmMudanca( request: Request, response: Response ) {
    const atualizarEmMudanca = new ServicoAtualizarEmMudanca();
    const { captcha, userAgent } = request.body;
    const result = await atualizarEmMudanca.executar({ captcha, userAgent });
    return response.json(result);
  }

  public async atualizarTodos( request: Request, response: Response ) {
    const atualizarTodos = new ServicoAtualizarTodos();
    const { captcha, userAgent } = request.body;
    const result = await atualizarTodos.executar({ captcha, userAgent });
    return response.json(result);
  }
}
