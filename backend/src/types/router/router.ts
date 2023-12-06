import { Router } from "express";
import LoginController from "src/modules/controller/LoginController";
import ListController from "src/modules/List/controller/ListController";
import UserController from "src/modules/User/controller/UserController";

export type RouterTypes = Router ;
export type ControllerType = ListController | UserController | LoginController;
