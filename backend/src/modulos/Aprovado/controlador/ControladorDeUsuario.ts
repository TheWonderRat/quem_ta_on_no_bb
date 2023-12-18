
import { Request, Response } from 'express';
import ServicoParaAtivarConta from '../servicos/ServicoParaAtivarConta';
import ServicoParaDesativarConta from '../servicos/ServicoParaDesativarConta';
import ServicoParaAtualizarSenha from '../servicos/ServicoParaAtualizarSenha';


export default class ControladorDeUsuario{
  public async atualizarSenha(request: Request, response: Response){
    const servicoAtualizar = new ServicoParaAtualizarSenha();
    const { login, senha, novaSenha } = request.body;
    //e possivel usar o cast de inscricao por conta da validacao do celebrate
    const result = await servicoAtualizar.executar({ login: Number(login), senha, novaSenha })

    return response.json(result)
  }
  public async ativarConta(request: Request, response: Response){
    const servicoAtivar = new ServicoParaAtivarConta()
    const { login, senha } = request.body;
    //e possivel usar o cast de inscricao por conta da validacao do celebrate
    const result = await servicoAtivar.executar({ login: Number(login), senha })
    return response.json(result)

  }
  public async desativarConta(request: Request, response: Response){
    const servicoDesativar = new ServicoParaDesativarConta()
    const { login, senha } = request.body;
    const result = await servicoDesativar.executar({login, senha});
    return response.json(result)

  }
}
