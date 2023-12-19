import { Request, Response, NextFunction } from 'express';
import { AppError, TokenInvalido, TokenNaoEncontrado } from '../../compartilhados/erros/exporter'
import { tokenUtils } from '../../funcoes/exporter';


export async function estaAutenticado(request: Request, response: Response, next: NextFunction): Promise<void | AppError>{

  const authHeader : string | undefined = request.headers.authorization;

  try{
    if(!authHeader){
      throw new TokenNaoEncontrado();
    }

    const [,token] = authHeader!!.split(' ');
    const isAuthenticated = tokenUtils.verificarToken(token);

    if(!isAuthenticated){
      throw new TokenInvalido();
    }
  } catch(e){
    next(e)
  }
  return next()
}
