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

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRoutes);
app.use(errors());
app.use(GerenciadorDeErros.gerenciar);

// public methods
app.listen(serverConfig.PORT_BACK, () => {
//  app.listen(3112, () => {
  //  carrega as rotinas do node cron
  //  carregarRotinas()
  console.log('called before');
  console.log(dataSource.isInitialized);
  console.log(`server started on ${serverConfig.HOST_BACK}:${serverConfig.PORT_BACK}`);
});
