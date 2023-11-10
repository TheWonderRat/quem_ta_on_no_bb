import QueryModel from './queryModel';

export default class QueryController {
  constructor() {
    this.model = new QueryModel();
  }

  async getListaTresParaUm(aprovados, pagina, token) {
    return this.model.tresParaUm(aprovados, pagina, token);
  }

  async getListaQuatroParaUm(aprovados, pagina, token) {
    return this.model.quatroParaUm(aprovados, pagina, token);
  }

  async getListaPCD(aprovados, pagina, token) {
    return this.model.pcd(aprovados, pagina, token);
  }

  async getListaPPP(aprovados, pagina, token) {
    return this.model.ppp(aprovados, pagina, token);
  }

  async getListaAmpla(aprovados, pagina, token) {
    return this.model.ampla(aprovados, pagina, token);
  }
}
