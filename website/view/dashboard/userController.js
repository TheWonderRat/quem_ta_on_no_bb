import UserModel from './userModel';

export default class UserController {
  constructor() {
    this.model = new UserModel();
  }

  async authenticateUser(login, senha) {
    await this.model.ativarConta(login, senha);
  }

  async ativarConta(login, senha) {
    await this.model.ativarConta(login, senha);
  }

  async atualizarSenha(login, senha, novaSenha) {
    await this.model.atualizarSenha(login, senha, novaSenha);
  }

  async criarSessao(login, senha) {
    return this.model.criarSessao(login, senha);
  }
}
