import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

//nomes das rotas
import { caminhos } from '../../../SSOT/exporter';
import ControladorDeMensagens from '../controlador/ControladorDeMensagens';

const rotasDeMensagem = Router();
const controladorDeMensagens = new ControladorDeMensagens();

//rota para atualizacao de conta
rotasDeMensagem.post(
// TODO: inserir constante
  caminhos.Mensagem.Interagir,
  celebrate({
    [Segments.BODY]: {
      mensagem: Joi.string().required(),
      clientUUID: Joi.string().required(),
      uuid: Joi.number().required()
    },
  }),
  controladorDeMensagens.enviarMensagem
);

export default rotasDeMensagem;
