import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';
import { Curso } from './curso.model';
import { Disciplina } from './disciplina.model';

export class HistoricoDocenciaInterna extends Base {

  public curriculum_profissional?: CurriculumProfissional;
  public disciplina?: Disciplina;

  public curriculum_profissional_id: string = "";
  public disciplina_id: string = "";

  public constructor(data?: any) { super(); this.initialization(data); }
}
