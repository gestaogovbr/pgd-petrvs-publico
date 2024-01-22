import { Base } from './base.model';
import { Curriculum } from './currriculum.model';
import { Curso } from './curso.model'

export class CurriculumGraduacao extends Base {

    public curriculum?: Curriculum;
    public curso?: Curso;
    
    public pretensao: number = 0; //Pretensão de fazer curso caso não tenha
    public curriculum_id: string = "";
    public curso_id: string = "";
<<<<<<< be3229002a8f2762ebfadf0dbcb030c7c1d37941
=======
    //public curriculum_id: string = ""; //ID do curriculum
>>>>>>> 2a822068a89f8f26a3c27ffd1a7e14ac55df1299
        
    public constructor(data?: any) { super(); this.initialization(data); }

}

