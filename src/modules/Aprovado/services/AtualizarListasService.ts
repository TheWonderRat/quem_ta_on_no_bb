import AppError, { AppErrorType } from '@shared/errors/AppError'
import {compare} from 'bcryptjs'
import { AprovadosRepo } from '../repository/AprovadoRepository';

interface IRequest {
	login:number;
	senha:string;
}

interface IResponse{
	token:string;
}

class AtualizarListasService{
	//not sure if I should use any here...
	//TODO:: later I should return, or a class of user, or an instance of AppError 
	public async execute({login, senha}: IRequest): Promise<IResponse | AppError>{

    const aprovado = await AprovadosRepo.findByLogin(login);

    if(!aprovado){
			return new AppError(AppErrorType.UserNotFound)
    }

		const hashedPswd = await compare(senha,aprovado.senha);

		if(!hashedPswd){
			return new AppError(AppErrorType.MissmatchedPassword)
		}

    return { token: "Atualizar Listas chamado com sucesso, embora ainda nao tenha sido implementado!" }
	}
}

export default AtualizarListasService;

