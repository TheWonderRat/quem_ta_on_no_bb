  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Diretoria } from '../modelo/exporter'
//relacionamentos
import { atributos, entidades, relacionamentos } from '../../../SSOT/base_de_dados/exporter';

 class DiretoriaRepo extends Repository<Diretoria> {
  public async cadastrarDiretoria(nome: string): Promise<void>{
    const ranking = this.criarDiretoria(nome);
    await this.manager.save(ranking);
  }

  public criarDiretoria(nome: string): Diretoria{
    const diretoria = dataSource.manager.create(Diretoria);
    diretoria.nome = nome;

    return diretoria;
  }
}
 export default new DiretoriaRepo(Diretoria, dataSource.manager);
