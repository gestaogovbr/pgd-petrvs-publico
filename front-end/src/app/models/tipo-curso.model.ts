import { Base } from './base.model';
import { Curso } from './curso.model';

export class TipoCurso extends Base {
    
    public curso?: Curso;

    public nome: string = ""; //Nome do tipo curso
    public ativo: number = 1; //Curso esta ativo ou não
       
    public constructor(data?: any) { super(); this.initialization(data); }
}
