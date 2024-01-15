import { AreaAtividadeExterna } from './area-atividade-externa.model';
import { Base } from './base.model';
import { CurriculumProfissional } from './currriculum-profissional.model';

export class HistoricoCursoExternoCurriculum extends Base {

    public curriculumProfissional?: CurriculumProfissional;
    public areaAtividadeExterna?: AreaAtividadeExterna;

    public nome : string = '';
    public pretensao : number = 0;
    public curriculum_profissional_id : string = "";
    public area_atividade_externa_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}