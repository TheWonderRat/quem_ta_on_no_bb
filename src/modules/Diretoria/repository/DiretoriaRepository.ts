import { myDataSource } from "@shared/typeorm"
import { Diretoria } from "../entity/Diretoria"
import DiretoriasDBConstants from "../constants/DiretoriaDBConstants";
import { Repository } from 'typeorm'


class DiretoriaRepository extends Repository<Diretoria>{
}

export const DiretoriasRepo = new DiretoriaRepository(Diretoria,myDataSource.manager);
