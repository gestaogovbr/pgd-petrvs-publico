import { Base } from './base.model';
import { AreaConhecimento } from './area-conhecimento.model';

export class Curso extends Base {
    
    public area?: AreaConhecimento;

    public nome: string = ""; //Nome do curso
    public titulo: string = ""; //Graduação, pós, mestrado, doc ou posdoc
    public ativo: number = 1; //Curso esta ativo ou não
    public tipo_curso_id: string =""
    public area_curso_id: string = ""; //Área do conhecimento
    
    public constructor(data?: any) { super(); this.initialization(data); }
}

