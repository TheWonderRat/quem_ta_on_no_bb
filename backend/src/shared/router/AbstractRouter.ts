export default abstract class AbstractRouter{

  //rootPath: deve incluid apenas o nome da rota, nao o nome dos antecessores
  constructor(rootPath: string){

  }

  //inserir as rotas 
  protected abstract initRoutes(): void;


}
