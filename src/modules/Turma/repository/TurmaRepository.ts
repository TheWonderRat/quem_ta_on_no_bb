import { myDataSource } from "../../../shared/typeorm"
import { Turma } from "../entity/Turma"
import { Repository } from 'typeorm'


class TurmaRepository extends Repository<Turma>{

}

export const TurmasRepo = new TurmaRepository(Turma,myDataSource.manager);
