import { Base } from './base.model';
import { CurriculumProfissional } from './currriculum-profissional.model';
import { Curso } from './curso.model';
import { Funcao } from './funcao.model';
import { Unidade } from './unidade.model';

export class HistoricoFuncao extends Base {

    public profissional?: CurriculumProfissional;
    public funcao?: Funcao;
    public unidade?: Unidade;

    public curriculum_profissional_id : string = "";
    public funcao_id : string = "";
    public unidade_id : string = "";
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
