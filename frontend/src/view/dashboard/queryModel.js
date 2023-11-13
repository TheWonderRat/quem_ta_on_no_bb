export default class QueryModel {
  constructor() {
    this.url = 'http://localhost:3002/usuario';
  }

  async tresParaUm(candidatos, pagina, token) {
    const url = `${this.url}/listar-tres/?candidatos=${candidatos}&pagina=${pagina}`;

    return fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (ok) => ok.json().then(async (o) => ({ ok: true, aprovados: o.aprovados }))
        .catch(async () => ({ ok: false, aprovados: [] })))
      .catch(async () => ({ ok: false, aprovados: [] }));
  }

  async quatroParaUm(candidatos, pagina, token) {
    const url = `${this.url}/listar-quatro/?candidatos=${candidatos}&pagina=${pagina}`;

    return fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (ok) => ok.json().then(async (o) => ({ ok: true, aprovados: o.aprovados }))
        .catch(async () => ({ ok: false, aprovados: [] })))
      .catch(async () => ({ ok: false, aprovados: [] }));
  }

  async pcd(candidatos, pagina, token) {
    const url = `${this.url}/listar-pcd/?candidatos=${candidatos}&pagina=${pagina}`;
    return fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (ok) => ok.json().then(async (o) => ({ ok: true, aprovados: o.aprovados }))
        .catch(async () => ({ ok: false, aprovados: [] })))
      .catch(async () => ({ ok: false, aprovados: [] }));
  }

  async ppp(candidatos, pagina, token) {
    const url = `${this.url}/listar-ppp/?candidatos=${candidatos}&pagina=${pagina}`;
    return fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (ok) => ok.json().then(async (o) => ({ ok: true, aprovados: o.aprovados }))
        .catch(async () => ({ ok: false, aprovados: [] })))
      .catch(async () => ({ ok: false, aprovados: [] }));
  }

  async ampla(candidatos, pagina, token) {
    const url = `${this.url}/listar-todos/?candidatos=${candidatos}&pagina=${pagina}`;

    return fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (ok) => ok.json()
        .then(async (o) => ({
          ok: true,
          message: 'resultados retornados com sucesso!',
          aprovados: o.aprovados }))
        .catch(async () => ({ ok: false, message: 'Erro de consulta!', aprovados: [] })))
      .catch(async () => ({ ok: false, message: 'Erro de consulta!', aprovados: [] }));
  }
}
