import AbstractRouter from "src/shared/router/AbstractRouter";
import { Router } from "express";
import SessionController from "../controller/SessionController";




export class SessionRouter extends AbstractRouter<Router, SessionController>{

  protected initRoutes(): void {
      
  }

  
  protected createLoginRoute(): void{

  }

}
