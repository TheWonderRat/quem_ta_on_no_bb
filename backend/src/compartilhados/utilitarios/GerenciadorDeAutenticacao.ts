import { Request, Response, NextFunction } from 'express';
import { AutenticacaoJWT } from '../dependencias/exporter';
import { TokenInvalido, TokenNaoEncontrado, AppError} from '../erros/exporter';

class GerenciadorDeAutenticacao{
  public async verificarAutenticacao(request: Request, __response: Response, next: NextFunction): Promise<void | AppError>{
    const authHeader = request.headers.authorization;

    try{
      if(!authHeader){
        throw new TokenNaoEncontrado();
      }
      const [,token] = authHeader.split(' ');
      const isAuthenticated = AutenticacaoJWT.validarToken(token);

      if(!isAuthenticated){
        throw new TokenInvalido();
      }
    } catch(E){
      next(E);
    }

    return next()
  }

  public gerarToken(parameters: string): string{
    return AutenticacaoJWT.gerarToken(parameters);
  } 

  //  refresh
  protected atualizarToken(){


  }
}

export default new GerenciadorDeAutenticacao();
