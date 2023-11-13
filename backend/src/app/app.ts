// import 'reflect-metadata';
import express from 'express';
// import cors from 'cors';
// import { errors } from 'celebrate';

// import AppError from '@shared/errors/AppError';
// import routes from '../routes';
// import '@shared/typeorm';

// middleware
import { ErrorMid } from '../middlewares/exporter';

const app = express();

// app.use(cors());
app.use(express.json());
// app.use(routes);
app.use(ErrorMid.errorHandler);

// app.use((error: Error, __request: Request, response: Response) => {
//   if (error instanceof AppError) {
//     return response.status(error.statusCode).json({
//       status: 'error',
//       message: error.message,
//     });
//   }

//   return response.status(500).json({
//     status: 'error',
//     message: 'Internal server error and this is a custom error!',
//   });
// });

export default app;
