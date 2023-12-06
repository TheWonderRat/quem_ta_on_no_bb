

export default abstract class AbstractRouter<RouterType>{
  protected router: RouterType;

  //rootPath: deve incluid apenas o nome da rota, nao o nome dos antecessores
  constructor(rootPath: string){

  }

  //inserir as rotas 
  protected abstract initRoutes(router: RouterType): void;


}
