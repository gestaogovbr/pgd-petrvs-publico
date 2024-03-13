import { Base } from './base.model';
import { CapacidadeTecnica } from './capacidade-tecnica.model';
import { CurriculumProfissional } from './curriculum-profissional.model';

export class HistoricoAtividadeInterna extends Base {

  public curriculum_profissional?: CurriculumProfissional;
  public capacidade_tecnica?: CapacidadeTecnica;

  public curriculum_profissional_id: string = "";
  public capacidade_tecnica_id: string = "";
  public atividade_desempenhada: string = "";

  public constructor(data?: any) { super(); this.initialization(data); }
}
