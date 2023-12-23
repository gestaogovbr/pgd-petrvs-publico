import { AreaConhecimento } from './area-conhecimento.model';
import { Base } from './base.model';
import { Curriculum } from './currriculum.model';
import { Curso } from './curso.model'

export class CurriculumGraduacao extends Base {

    public curriculum_id?: Curriculum;
    public curso_id?: Curso;
    public area_conhecimento?: AreaConhecimento;
    
    public pretensao: number = 0; //Pretensão de fazer curso caso não tenha
    //public curriculum_id: string = ""; //ID do curriculum
        
    public constructor(data?: any) { super(); this.initialization(data); }
}
