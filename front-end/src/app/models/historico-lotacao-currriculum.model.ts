import { Base } from './base.model';
import { CurriculumProfissional } from './currriculum-profissional.model';
import { Curso } from './curso.model';
import { Unidade } from './unidade.model';

export class HistoricoLotacaoCurriculum extends Base {

    public profissional?: CurriculumProfissional;
    public unidade?: Unidade;

    public curriculum_profissional_id : string = "";
    public unidade_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}