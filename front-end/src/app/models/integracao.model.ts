import { Base } from './base.model';

export class Integracao extends Base {

    public data_execucao: string = "";
    public usuario_id: string = "";    
    public entidade_id: string = "";
    public atualizar_unidades: boolean = false;   
    public atualizar_servidores: boolean = false;       
    public atualizar_gestores: boolean = false;         
    public usar_arquivos_locais: boolean = false;    
    public salvar_arquivos_locais: boolean = false;

    constructor(){
        super();
    }
}