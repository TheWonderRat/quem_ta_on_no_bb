import { Router } from "express";
import ControladorDeSessao from "../controlador/ControladorDeSessao";
 import { celebrate, Joi, Segments } from 'celebrate';
import { caminhos } from "src/SSOT/exporter";


const rotasDeSessao = Router();
const controladorDeSessao = new ControladorDeSessao();


  
rotasDeSessao.post(
      //TODO:: Incluir o nome da rota no arquivo de constantes
 caminhos.Sessao.CriarSessao,
 celebrate({
   [Segments.BODY]: {
     login: Joi.number().required(),
     senha: Joi.string().required(),
   },
 }),
  controladorDeSessao.criarSessao
)

export default rotasDeSessao;
