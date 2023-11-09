export default class UserModel {
  constructor() {
    this.url = 'http://localhost:3002/usuario';
    this.resposes = {};
  }

  async ativarConta(login, senha) {
    const url = `${this.url}/listar-todos/?candidatos=${login}&pagina=${senha}`;
    await fetch(url)
      .then((__resolve) => {
      }).catch((__err) => {
      });
  }

  async atualizarSenha(login, senha, novaSenha) {
    const url = `${this.url}/atualizar-senha`;
    await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      body: { login, senha, novaSenha },
    })
      .then((__resolve) => {
      })
      .catch((__err) => {
      });
  }

  async criarSessao(login, senha) {
    const url = `${this.url}/criar-sessao`;
    const sessionHeader = new Headers();

    sessionHeader.append('Content-Type', 'application/json');

    return fetch(url, {
      method: 'POST',
      headers: sessionHeader,
      body: JSON.stringify({ login, senha }),
    })
      .then(async (resolve) => resolve.json()
        .then((res) => ({ ok: true, message: ' ', token: res.token }))
        .catch(async (__err) => ({ ok: false, message: 'falha de autenticacao' })))
      .catch(async (__e) => ({ ok: false, message: 'falha de autenticacao' }));
  }
}
