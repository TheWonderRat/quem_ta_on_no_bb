  //libraries
 import { TipoTurma } from '../../../tipos/repositorios/turma';
import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Turma } from '../modelo/exporter'

 class TurmaRepo extends Repository<Turma> {
  public async cadastrarTurma(numeroTurma: number): Promise<void>{
    const turma = this.criarTurma(numeroTurma);
    await this.manager.save(turma);
  }

  public criarTurma(numeroTurma: number): Turma{
    const turma = dataSource.manager.create(Turma);

    turma.numero = numeroTurma;

    return turma;
  }

    public async buscarTurma(turma: TipoTurma): Promise<Turma| null >{
      if (turma === "ultima") {
        return await this.createQueryBuilder().select("MAX(numero)").getOne();
      } 

      return await this.findOne({ where: { numero: turma}});
    }

}
 export default new TurmaRepo(Turma, dataSource.manager);
