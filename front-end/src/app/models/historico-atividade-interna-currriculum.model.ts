import { AreaTematica } from './area-tematica.model';
import { Base } from './base.model';
import { CapacidadeTecnica } from './capacidade-tecnica.model';
import { CurriculumProfissional } from './currriculum-profissional.model';

export class HistoricoAtividadeInternaCurriculum extends Base {

    public profissional?: CurriculumProfissional;
    public capacidade_tecnica?: CapacidadeTecnica;
    public area_tematica?: AreaTematica;

    public curriculum_profissional_id : string = "";
    public capacidade_tecnica_id : string = "";
    public area_tematica_id : string ="";
    public atividade_desempenhada : string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}
