  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Contato } from '../modelo/exporter'

 class ContatoRepo extends Repository<Contato> {
  public async cadastrarContato(inscricao: number,email: string,celular: number): Promise<void>{
    const contato = this.criarContato(inscricao, email, celular);
    await this.manager.save(contato);
  }

  public criarContato(inscricao: number,email: string,celular: number): Contato{
    const contato = dataSource.manager.create(Contato);
    contato.posicao = inscricao;
    contato.email = email;
    //contato.celular = celular;


    return contato;
  }
}
 export default new ContatoRepo(Contato, dataSource.manager);
