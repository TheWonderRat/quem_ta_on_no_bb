import { Router } from "express";
import ControladorDeSessao from "../controlador/ControladorDeSessao";
 import { celebrate, Joi, Segments } from 'celebrate';


const rotasDeSessao = Router();
const controladorDeSessao = new ControladorDeSessao();


  
rotasDeSessao.post(
      //TODO:: Incluir o nome da rota no arquivo de constantes
 '/criar-sessao',
 celebrate({
   [Segments.BODY]: {
     login: Joi.number().required(),
     senha: Joi.string().required(),
   },
 }),
  controladorDeSessao.criarSessao
)

export default rotasDeSessao;
