import { Base } from './base.model';
import { CurriculumProfissional } from './currriculum-profissional.model';
import { Curso } from './curso.model';
import { Funcao } from './funcao.model';

export class HistoricoFuncaoCurriculum extends Base {

    public profissional?: CurriculumProfissional;
    public funcao?: Funcao;

    public curriculum_profissional_id : string = "";
    public funcao_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
