import { Base } from './base.model';
import { Usuario } from './usuario.model';

export class Curriculum extends Base {

    public usuario?: Usuario;

    public apresentacao: string = ""; //Pretensão de fazer curso caso não tenha
    public telefone: string = ""; 
    public idiomas: string = "";
    public estado_civil :  string="";
    public filhos : number= 0;
    public quantidade_filhos : number = 0;
    public ativo: number = 1; 
    
    public usuario_id: string = ""; //ID do usuario 
    public cidade_id: string = ""; //ID da cidade
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
