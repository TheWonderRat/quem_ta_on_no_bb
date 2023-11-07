import { Router } from 'express'

import userRouter from '@modules/Aprovado/routes/aprovado.routes'

//import userRouter from './src/modules/User/routes/user.routes';
//import filesRouter from '@modules/File/routes/files.routes'
//import sessionRouter from '@modules/User/routes/session.routes'
//import folderRouter from '@modules/Folder/routes/folder.routes'
import {Request, Response, NextFunction} from 'express';
import AppError from '@shared/errors/AppError';
const router = Router()

router.use('/usuario',userRouter);
//router.use('/file',filesRouter);
//router.use('/session',sessionRouter);
//router.use('/folder',folderRouter);
router.use('/anorther-dummy-route-to-prevent-express-shitty-error/not to be EVER found',(request: Request, response: Response) =>{ 
	return response.status(500).json({status: "forbidden", message:"what the thell, get out!!" });
});


export default router;

