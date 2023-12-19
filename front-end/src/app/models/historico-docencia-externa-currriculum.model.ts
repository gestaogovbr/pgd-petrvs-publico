import { AreaAtividadeExterna } from './area-atividade-externa.model';
import { Base } from './base.model';
import { CurriculumProfissional } from './currriculum-profissional.model';
import { Curso } from './curso.model';

export class HistoricoDocenciaExternaCurriculum extends Base {

    public profissional?: CurriculumProfissional;
    public areaAtividadeExterna?: AreaAtividadeExterna;
    public curso?: Curso;

    public curso_id : string = "";
    public curriculum_profissional_id : string = "";
    public area_atividade_externa_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
