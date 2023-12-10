// types
import express,{ Express } from 'express';
import { errors } from 'celebrate';
import appRoutes from '../routes/routes';
import cors from 'cors';

// SSOT
import { serverConfig } from '../SSOT/exporter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(appRoutes);
app.use(errors())


  // public methods
app.listen(serverConfig.PORT_BACK, () => {
  console.log(`server started on ${serverConfig.HOST_BACK}:${serverConfig.PORT_BACK}`);
});

