
import { hash, compare } from 'bcryptjs';
import { BCRYPT_SALT_ROUNDS } from '../../SSOT/bcrypt/bcrypt';


class CripgrafiaBCrypt{

  async criptografarSenha(senha: string): Promise<string>{
    const hashedPswd = await hash(senha,BCRYPT_SALT_ROUNDS)

    return hashedPswd;
  }

  async compararSenha(hashSenha: string, senha: string): Promise<boolean>{

    return await compare(senha,hashSenha);
  }
}

export default new CripgrafiaBCrypt();
