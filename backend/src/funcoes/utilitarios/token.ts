import { AppError, TokenInvalido}from '../../compartilhados/erros/exporter';
import { JWT_SECRET,JWT_SIGN_OPTIONS } from '../../SSOT/jwt/jwt';
import jsonwebtoken from 'jsonwebtoken';

export function gerarToken(login: number): string{
  const token = jsonwebtoken.sign(
    { login },
    JWT_SECRET, 
    { 
      subject: login.toString(), 
      expiresIn: JWT_SIGN_OPTIONS.expiresIn,
      algorithm: JWT_SIGN_OPTIONS.algorithm
    }
  );

  return token.toString();
}

export function verificarToken(token: string): boolean{

  try{
    jsonwebtoken.verify(token, JWT_SECRET,{ complete: true })
    return true;
  } catch(e){
    return false;
  }
}
