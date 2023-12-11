import { Router } from "express";
import rotasDeRanking from "../modulos/Ranking/rotas/RotasDeRanking";
import rotasDeSessao from "../modulos/Sessao/rotas/RotasDeSessao";
import rotasDeUsuario from "../modulos/Usuario/rotas/RotasDeUsuario";
import { pathNames } from "../SSOT/exporter";



const rotasDoApp = Router()

rotasDoApp.use(pathNames.ranking,rotasDeRanking)
rotasDoApp.use(pathNames.sessao,rotasDeSessao)
rotasDoApp.use(pathNames.usuario,rotasDeUsuario)


export default rotasDoApp;

