// types
import express,{ Express } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
//import routes from ''

// SSOT
import { serverConfig } from '../SSOT/exporter';

const app = express();
app.use(cors());
app.use(express.json());
//app.use(routes);
app.use(errors())


  // public methods
app.listen(serverConfig.PORT_BACK, () => {
  console.log(`server started on ${serverConfig.HOST_BACK}:${serverConfig.PORT_BACK}`);
});

