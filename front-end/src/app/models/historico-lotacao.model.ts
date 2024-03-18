import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';
import { Unidade } from './unidade.model';

export class HistoricoLotacao extends Base {

  public curriculum_profissional?: CurriculumProfissional;
  public unidade?: Unidade;

  public curriculum_profissional_id: string = "";
  public unidade_id: string = "";

  public constructor(data?: any) { super(); this.initialization(data); }
}