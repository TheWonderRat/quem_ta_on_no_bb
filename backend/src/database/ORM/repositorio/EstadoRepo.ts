  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, Estado, Ranking } from '../modelo/exporter'

 class EstadoRepo extends Repository<Estado> {
  public async cadastrarEstado(nome: string): Promise<void>{
    const ranking = this.criarEstado(nome);
    await this.manager.save(ranking);
  }

  public criarEstado(nome: string): Estado{
    const estado = dataSource.manager.create(Estado);
    estado.nome = nome;

    return estado;
  }
}
 export default new EstadoRepo(Estado, dataSource.manager);
