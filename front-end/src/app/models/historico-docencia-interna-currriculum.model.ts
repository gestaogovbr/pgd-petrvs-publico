import { Base } from './base.model';
import { CurriculumProfissional } from './currriculum-profissional.model';
import { Curso } from './curso.model';

export class HistoricoDocenciaInternaCurriculum extends Base {

    public profissional?: CurriculumProfissional;
    public curso?: Curso;

    public curriculum_profissional_id : string = "";
    public curso_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
