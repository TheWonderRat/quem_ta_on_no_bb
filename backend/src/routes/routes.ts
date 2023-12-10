import { Router } from "express";
import listRouter from "src/modules/List/routes/ListRoutes";
import sessionRouter from "src/modules/Session/routes/SessionRoutes";
import userRouter from "src/modules/User/routes/UserRoutes";
import { pathNames } from "src/SSOT/exporter";



const appRoutes = Router()

appRoutes.use(pathNames.list,listRouter)
appRoutes.use(pathNames.session,sessionRouter)
appRoutes.use(pathNames.user,userRouter)


export default appRoutes;

