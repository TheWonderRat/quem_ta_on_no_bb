export default class StatsModel {
  constructor() {
    this.baseUrl = 'http://localhost:3002';
  }

  static async nomeacoes() {
    // console.log("controller stats nomeacoes");
    return { stats: [{}, {}, {}], message: 'dummy nomeacoes, nao esta implementato ainda' };
  }

  static async desistentesEIndeferidos() {
    return { stats: [{}, {}, {}], message: 'dummy desistentes, nao esta implementato ainda' };
    // console.log("controller stats indeferidos e desistentes");
  }

  static async estatisticasGerais() {
    return { stats: [{}, {}, {}], message: 'dummy gerais, nao esta implementato ainda' };
    // console.log("controller stats estatisticas gerais");
  }

  static async porPrazo() {
    return { stats: [{}, {}, {}], message: 'dummy por prazo, nao esta implementato ainda' };
    // console.log("controller stats prazo");
  }
}
