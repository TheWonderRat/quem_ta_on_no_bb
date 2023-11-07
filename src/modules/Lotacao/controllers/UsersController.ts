/*
import { Request, Response, NextFunction } from 'express'

import AtivarContaService from '../services/AtivarContaService';
import AtualizarSenhaService from '../services/AtualizarSenhaService';
import AtualizarListasService from '../services/AtualizarListasService';
import CriarSessaoService from '../services/CriarSessaoService';
import ListarGeralService from '../services/ListarGeralService';
import ListarConvocacoes from '../services/ListarConvocacoes';
import ListarPCDService from '../services/ListarPCDService';
import ListarPPPService from '../services/ListarPPPService';
import ListarTresParaUmService from '../services/ListarTresParaUmService';
import ListarQuatroParaUmService from '../services/ListarQuatroParaUmService';

export default class UserController{
  async ativarConta(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const ativarConta = new AtivarContaService();
		const users = await ativarConta.execute(request.body);

		return response.json(users);
	}

  async criarSessao(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const criarSessao = new CriarSessaoService();
		const users = await criarSessao.execute(request.body);

		return response.json(users);
	}


  async atualizarSenha(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const atualizarSenha = new AtualizarSenhaService();
		const users = await atualizarSenha.execute(request.body);

		return response.json(users);
	}

  async listarGeral(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarGeral = new ListarGeralService();

    const{candidatos, pagina} = request.query;
    //o celebrate garante que sempre serao numeros
		const users = await listarGeral.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
		return response.json(users);
	}

  async listarPPP(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarPPP = new ListarPPPService();
    //TODO:: filtrar os parametros aqui

    const{candidatos, pagina} = request.query;
    //o celebrate garante que sempre serao numeros
		const users = await listarPPP.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
		return response.json(users);
	}

  async listarPCD(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarPCD = new ListarPCDService();
    //TODO:: filtrar os parametros aqui
    const{candidatos, pagina} = request.query;

		const users = await listarPCD.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

		return response.json(users);
	}

  async listarTresParaUm(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarConvocacoes = new ListarTresParaUmService();
    //TODO:: filtrar os parametros aqui
    const {candidatos, pagina}= request.query;
    //possivel por conta da validacao do express
		const users = await listarConvocacoes.execute({candidatos: Number(candidatos), pagina: Number(pagina)});

		return response.json(users);
	}

  async listarQuatroParaUm(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarConvocacoes = new ListarQuatroParaUmService();
    //TODO:: filtrar os parametros aqui
    const {candidatos, pagina}= request.query;
    //possivel por conta da validacao do express
		const users = await listarConvocacoes.execute({candidatos: Number(candidatos), pagina: Number(pagina)});

		return response.json(users);
	}

  async listarConvocacoes(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarConvocacoes = new ListarConvocacoes();
    //TODO:: filtrar os parametros aqui
    const {candidatos, pagina}= request.query;
    //possivel por conta da validacao do express
		const users = await listarConvocacoes.execute({candidatos: Number(candidatos), pagina: Number(pagina)});
		return response.json(users);
	}


  async atualizarListas(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const updateUsers = new AtualizarListasService();
    //TODO:: filtrar os parametros aqui
		const users = await updateUsers.execute(request.body);

		return response.json(users);
	}
}
*/

