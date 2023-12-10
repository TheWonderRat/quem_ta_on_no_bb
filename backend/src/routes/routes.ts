import { Router } from "express";
import listRouter from "../modules/List/routes/ListRoutes";
import sessionRouter from "../modules/Session/routes/SessionRoutes";
import userRouter from "../modules/User/routes/UserRoutes";
import { pathNames } from "../SSOT/exporter";



const appRoutes = Router()

appRoutes.use(pathNames.list,listRouter)
appRoutes.use(pathNames.session,sessionRouter)
appRoutes.use(pathNames.user,userRouter)


export default appRoutes;

