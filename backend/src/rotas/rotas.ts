import { Router } from 'express';
import rotasDeRanking from '../modulos/Ranking/rotas/RotasDeRanking';
import rotasDeSessao from '../modulos/Sessao/rotas/RotasDeSessao';
import rotasDeUsuario from '../modulos/Aprovado/rotas/RotasDeUsuario';
import rotasDeAtualizacao from '../modulos/Atualizacao/rotas/RotasDeAtualizacao';
import { caminhos } from '../SSOT/exporter';

const rotasDoApp = Router();

rotasDoApp.use(caminhos.ranking, rotasDeRanking);
rotasDoApp.use(caminhos.sessao, rotasDeSessao);
rotasDoApp.use(caminhos.usuario, rotasDeUsuario);
rotasDoApp.use(caminhos.atualizacao, rotasDeAtualizacao);

export default rotasDoApp;
