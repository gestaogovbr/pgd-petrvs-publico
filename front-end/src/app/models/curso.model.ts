import { Base } from './base.model';

export class Curso extends Base {
    public nome_curso: string = ""; //Nome do curso
    public titulo: string = ""; //Graduação, pós, mestrado, doc ou posdoc
    public ativo: number = 1; //Curso esta ativo ou não
    public area_curso_id: string = ""; //Área do conhecimento
    
    public constructor(data?: any) { super(); this.initialization(data); }
}
