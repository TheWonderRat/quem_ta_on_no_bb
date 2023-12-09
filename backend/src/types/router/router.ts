import { Router } from "express";
import ListController from "src/modules/List/controller/ListController";
import SessionController from "src/modules/Session/controller/SessionController";
import UserController from "src/modules/User/controller/UserController";

export type RouterTypes = Router ;
export type ControllerTypes = ListController | UserController | SessionController;
