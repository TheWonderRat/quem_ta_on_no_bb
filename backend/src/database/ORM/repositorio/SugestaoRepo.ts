  //  libraries
import { Repository } from 'typeorm';
import { Sugestao } from '../modelo/exporter';

  //  ORM
import dataSource from '../../config';
  //  entity
import { Cidade } from '../modelo/exporter'

 class SugestaoRepo extends Repository<Sugestao> {
  public async cadastrarSugestao(
      uuidWhatsapp: string,
      posicaoAmpla: number,
      sugestaoDoUsuario: string
  ): Promise<void>{

    const sugestao = this.criarSugestao(uuidWhatsapp,posicaoAmpla, sugestaoDoUsuario);

    await this.manager.save(sugestao);
  }

  public criarSugestao(
      uuidWhatsapp: string,
      posicaoAmpla: number,
      sugestao: string
    ): Sugestao{
      const sug = this.manager.create(Sugestao);
      sug.uuidWhatsapp = uuidWhatsapp;
      sug.posicaoAmpla = posicaoAmpla;
      sug.sugestao = sugestao;

    return sug;
  }
}
export default new SugestaoRepo(Sugestao, dataSource.manager);
