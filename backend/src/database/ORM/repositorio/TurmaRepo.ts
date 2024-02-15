  //libraries
import { In, Repository } from 'typeorm';

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

  public async buscarTurma(turma?: number): Promise<Turma| null >{
    if (turma) {
      return await this.createQueryBuilder().select("MAX(numero)").getOne();
    } 
    return await this.findOne({ where: { numero: turma}});
  }

  public async buscarTodos(): Promise<Turma[]>{
    return await this.find();
  }
}
 export default new TurmaRepo(Turma, dataSource.manager);
