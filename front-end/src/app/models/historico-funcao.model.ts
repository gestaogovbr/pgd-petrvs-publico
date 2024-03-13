import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';
import { Funcao } from './funcao.model';
import { Unidade } from './unidade.model';

export class HistoricoFuncao extends Base {

  public curriculum_profissional?: CurriculumProfissional;
  public funcao?: Funcao;
  public unidade?: Unidade;

  public curriculum_profissional_id: string = "";
  public funcao_id: string = "";
  public unidade_id: string | null = null;

  public constructor(data?: any) { super(); this.initialization(data); }
}
