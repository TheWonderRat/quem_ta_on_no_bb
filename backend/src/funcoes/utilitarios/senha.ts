import { hash, compare } from 'bcryptjs';
import { BCRYPT_SALT_ROUNDS } from '../../SSOT/bcrypt/bcrypt';

export async function criptografarSenha(senha: string): Promise<string>{
  const hashedPswd = await hash(senha,BCRYPT_SALT_ROUNDS)

  return hashedPswd;
}

export async function compararSenha(hashSenha: string, senha: string): Promise<boolean>{

  return await compare(senha,hashSenha);
}
