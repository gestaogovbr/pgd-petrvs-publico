import { Base } from './base.model';
import { Usuario } from './usuario.model';

export class Curriculum extends Base {
    public usuario?: Usuario;
    public apresentacao: string = ""; //Pretensão de fazer curso caso não tenha
    public telefone: string = ""; //ID do curriculum
    public idiomas: string = ""; //ID do curso 
    public ativo: number = 1; //ID do curso 
        
    public constructor(data?: any) { super(); this.initialization(data); }
}
