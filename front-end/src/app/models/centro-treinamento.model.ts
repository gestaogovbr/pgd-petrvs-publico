import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';

export class CentroTreinamento extends Base {

  public curriculuns_profissionais?: CurriculumProfissional[];

  public nome: string = ""; //Nome do CT
  public ativo: number = 1; //Curso esta ativo ou não

  public constructor(data?: any) { super(); this.initialization(data); }
}
