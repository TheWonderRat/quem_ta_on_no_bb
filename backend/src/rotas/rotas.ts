import { Router } from "express";
import rotasDeRanking from "../modulos/Ranking/rotas/RotasDeRanking";
import rotasDeSessao from "../modulos/Sessao/rotas/RotasDeSessao";
import rotasDeUsuario from "../modulos/Aprovado/rotas/RotasDeUsuario";
import { caminhos } from "../SSOT/exporter";



const rotasDoApp = Router()

rotasDoApp.use(caminhos.ranking,rotasDeRanking)
rotasDoApp.use(caminhos.sessao,rotasDeSessao)
rotasDoApp.use(caminhos.usuario,rotasDeUsuario)


export default rotasDoApp;

