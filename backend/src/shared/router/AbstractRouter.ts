

export default abstract class AbstractRouter<RouterType, ControllerType>{
  public readonly rootPath: string;
  protected router: RouterType;
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
