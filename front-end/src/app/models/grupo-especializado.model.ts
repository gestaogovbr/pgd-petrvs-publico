import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';

export class GrupoEspecializado extends Base {

  public curriculuns_profissionais?: CurriculumProfissional[];  // Lista de currículos profissionais

  public nome: string = ""; //Nome do grupo especializado
  public ativo: number = 1; //Grupo está ativo ou não

  public constructor(data?: any) { super(); this.initialization(data); }
}
