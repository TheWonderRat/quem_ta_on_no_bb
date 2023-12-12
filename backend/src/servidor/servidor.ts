// types
import express from 'express';
import { errors } from 'celebrate';
import appRoutes from '../rotas/rotas';
import cors from 'cors';
import dataSource from '../database/config';

// SSOT
import { serverConfig } from '../SSOT/exporter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRoutes);
app.use(errors())


  // public methods
app.listen(serverConfig.PORT_BACK, () => {
  console.log("called before");
  console.log(dataSource.isInitialized);
  console.log(`server started on ${serverConfig.HOST_BACK}:${serverConfig.PORT_BACK}`);
});

