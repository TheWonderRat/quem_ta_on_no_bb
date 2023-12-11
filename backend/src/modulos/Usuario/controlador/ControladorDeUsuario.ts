
import { Request, Response } from 'express';
import ServicoParaAtivarConta from '../servicos/ServicoParaAtivarConta';
import ServicoParaDesativarConta from '../servicos/ServicoParaDesativarConta';
import ServicoParaAtualizarSenha from '../servicos/ServicoParaAtualizarSenha';


export default class ControladorDeUsuario{
  public async atualizarSenha(request: Request, response: Response){
    const servicoAtualizar = new ServicoParaAtualizarSenha();
    const {email} = request.params;
    const result = await servicoAtualizar.executar({email})

    return response.json(result)
  }
  public async ativarConta(request: Request, response: Response){
    const servicoAtivar = new ServicoParaAtivarConta()
    const {email} = request.params;
    const result = await servicoAtivar.executar({email});
    return response.json(result)

  }
  public async desativarConta(request: Request, response: Response){
    const servicoDesativar = new ServicoParaDesativarConta()
    const {email} = request.params;
    const result = await servicoDesativar.executar({email});
    return response.json(result)

  }
}
