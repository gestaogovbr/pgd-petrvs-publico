import { Base } from './base.model';

export class GrupoEspecializado extends Base {
  
    public nome: string = ""; //Nome da funcao
    public ativo: number = 1; //Funcao esta ativo ou não
       
    public constructor(data?: any) { super(); this.initialization(data); }
}
