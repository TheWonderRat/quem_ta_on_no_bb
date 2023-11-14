import 'reflect-metadata'
import express,{NextFunction,Request,Response} from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from './routes';
import AppError from '@shared/errors/AppError'
import "@shared/typeorm"

const app = express();
const PORT = 3001;
const IP_ADDR = '192.168.1.105';

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors())

app.use((
	error: Error, 
	request: Request, 
	response: Response, 
	next: NextFunction
) => {
	if(error instanceof AppError){

		return response.status(error.statusCode).json({
			status:'error',
			message:error.message
		});
	}


	return response.status(500).json({
		status:'error',
		message:'Internal server error and this is a custom error!'
	});
})

app.listen( PORT , async () =>{
	console.log(`server started on ${IP_ADDR}:${PORT}`);
})







