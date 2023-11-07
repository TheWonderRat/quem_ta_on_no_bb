import 'reflect-metadata'
import express,{NextFunction,Request,Response} from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from './routes';
import AppError from '@shared/errors/AppError'
import "@shared/typeorm"
import { User } from '@modules/User/entity/UserEntity'

const app = express();
const PORT = 3001;
const IP_ADDR = '192.168.1.105';

//app.use((request: Request, response: Response) =>{console.log("this was called after all services")});
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors())
//app.use((err:Error,req: Request,res: Response,next: NextFunction) =>{});

app.use((
	error: Error, 
	request: Request, 
	response: Response, 
	next: NextFunction
) => {

  console.log("called on server.ts");
  console.log(request);

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
//app.listen( PORT ,() =>{
	console.log(`server started on ${IP_ADDR}:${PORT}`);
   
  
})







