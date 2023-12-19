import { CriptografiaBCrypt } from '../dependencias/exporter';

export class GerenciadorDeSenha{

  async criptografarSenha(senha: string): Promise<string>{
    return CriptografiaBCrypt.criptografarSenha(senha);
  }

  async compararSenha(hashSenha: string, senha: string): Promise<boolean>{
    return CriptografiaBCrypt.compararSenha(hashSenha, senha);
  }
}

export default new GerenciadorDeSenha();

