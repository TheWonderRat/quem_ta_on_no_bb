import StatsModel from './statsModel';

export default class StatsController {
  constructor() {
    this.model = new StatsModel();
  }

  async getNomeacoes() {
    return this.model.nomeacoes();
  }

  async getIndeferidosEDesistentes() {
    return this.model.desistentesEIndeferidos();
  }

  async getEstatisticasGerais() {
    return this.model.estatisticasGerais();
  }

  async getPorPrazo() {
    return this.model.porPrazo();
  }
}
