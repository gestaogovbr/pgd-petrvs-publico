import { Base } from './base.model';
import { Curriculum } from './curriculum.model';
import { Curso } from './curso.model'

export class CurriculumGraduacao extends Base {

    public curriculum?: Curriculum;
    public curso?: Curso;
    
    public pretensao: number = 0; //Pretensão de fazer curso caso não tenha
    public curriculum_id: string = "";
    public curso_id: string = "";
        
    public constructor(data?: any) { super(); this.initialization(data); }

}

