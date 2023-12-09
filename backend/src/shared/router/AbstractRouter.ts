import { ControllerTypes, RouterTypes } from "src/types/router/router";


export default abstract class AbstractRouter<RouterType extends RouterTypes, ControllerType extends ControllerTypes>{
  public readonly rootPath: string;
  public readonly router: RouterType;
  protected controller: ControllerType;

  //rootPath: deve incluid apenas o nome da rota, nao o nome dos antecessores
  constructor(
    rootPath: string,
    router: RouterType,
    controller: ControllerType
  ){
    this.rootPath = rootPath;
    this.controller = controller;
    this.router = router;
    this.initRoutes();
  }

  //inserir as rotas 
  protected abstract initRoutes(): void;


}
