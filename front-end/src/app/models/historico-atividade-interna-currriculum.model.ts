import { Base } from './base.model';
import { CapacidadeTecnica } from './capacidade-tecnica.model';
import { CurriculumProfissional } from './currriculum-profissional.model';

export class HistoricoAtividadeInternaCurriculum extends Base {

    public profissional?: CurriculumProfissional;
    public capacidade?: CapacidadeTecnica;

    public curriculum_profissional_id : string = "";
    public capacidade_tecnica_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
