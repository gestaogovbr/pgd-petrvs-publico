import { AreaAtividadeExterna } from './area-atividade-externa.model';
import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';

export class HistoricoAtividadeExterna extends Base {

  public curriculum_profissional?: CurriculumProfissional;
  public area_atividade_externa?: AreaAtividadeExterna;

  public curriculum_profissional_id: string = '';
  public area_atividade_externa_id: string = '';

  public constructor(data?: any) { super(); this.initialization(data); }
}
