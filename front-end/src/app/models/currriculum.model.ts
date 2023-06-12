import { Base } from './base.model';
import { Usuario } from './usuario.model';

export class Curriculum extends Base {

    public usuario?: Usuario;

    public apresentacao: string = ""; //Apresentação do servidor
    public telefone: string = ""; // Telefone do servidor
    public idiomas: [] = [];// Idiomas falado pelo servidor
    public estado_civil :  string="";//
    public quantidade_filhos : number = 0;
    public ativo: number = 1; //Curriculum ativo ou não
    
    public usuario_id: string = ""; //ID do usuario 
    public cidade_id: string = ""; //ID da cidade
   // public curriculum_id? : string= ""; 
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
