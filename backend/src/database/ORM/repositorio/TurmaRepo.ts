  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, Ranking, Turma } from '../modelo/exporter'
//relacionamentos
import { atributos, entidades, relacionamentos } from '../../../SSOT/base_de_dados/exporter';

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
}
 export default new TurmaRepo(Turma, dataSource.manager);
