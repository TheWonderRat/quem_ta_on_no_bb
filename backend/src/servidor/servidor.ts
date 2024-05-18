import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import { errors } from 'celebrate';
import appRoutes from '../rotas/rotas';
import dataSource from '../database/config';
//  import carregarRotinas from '../compartilhados/dependencias/RotinasNodeCron';

// SSOT
import { serverConfig } from '../SSOT/exporter';
import { GerenciadorDeErros } from '../compartilhados/utilitarios/exporter';

async function initServer(){
  await dataSource.initialize();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(appRoutes);
  app.use(errors());
  app.use(GerenciadorDeErros.gerenciar);

  // public methods
  app.listen(serverConfig.PORT_BACK, () => {
    console.log(dataSource.isInitialized);
    console.log(`server started on ${serverConfig.HOST_BACK}:${serverConfig.PORT_BACK}`);
  });
}

initServer()
  .then((ok) => console.log(`everything ok!`))
  .catch((err) => console.log(`error:\n${err}`))
