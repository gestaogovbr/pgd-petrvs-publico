import { Base } from './base.model';
//import { AreaConhecimento } from './area-conhecimento.model';

export class CentroTreinamento extends Base {
    
    //public area?: AreaConhecimento;

    public nome: string = ""; //Nome do CT
    public ativo: number = 1; //Curso esta ativo ou não
   
    public constructor(data?: any) { super(); this.initialization(data); }
}
