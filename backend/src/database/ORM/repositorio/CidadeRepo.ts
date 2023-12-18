  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Cidade } from '../modelo/exporter'

 class CidadeRepo extends Repository<Cidade> {
  public async cadastrarCidade(nome: string, estado: string): Promise<void>{

    const cidade = this.criarCidade(nome, estado);
    await this.manager.save(cidade);
  }

  public criarCidade(nome: string,estado: string): Cidade{
      const cidade = this.manager.create(Cidade);
      cidade.nome = nome;
      cidade.estado = estado;

    return cidade;
  }
}
 export default new CidadeRepo(Cidade, dataSource.manager);
