
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET,JWT_SIGN_OPTIONS } from "../../SSOT/jwt/jwt";


class AutenticacaoJWT{

  public gerarToken(parameters: string): string{
    const token = jsonwebtoken.sign(
      { login: parameters },
      JWT_SECRET, 
      { 
        subject: parameters.toString(), 
        expiresIn: JWT_SIGN_OPTIONS.expiresIn,
        algorithm: JWT_SIGN_OPTIONS.algorithm
      });

    return token.toString();
  } 

  public validarToken(token: string): boolean{
    try{
      jsonwebtoken.verify(token, JWT_SECRET,{ complete: true })
    } catch(e){
      return false;
    }
    return true;
  }

  //refresh
  public atualizarToken(){


  }
}

export default new AutenticacaoJWT();

