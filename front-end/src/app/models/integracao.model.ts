import { Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Base } from './base.model';
import { Entidade } from './entidade.model';
import { Usuario } from './usuario.model';

export class Integracao extends Base {
    public entidade?: Entidade; /* Objeto da entidade */
    public usuario?: Usuario; /* Objeto do usuário */
    
    public data_execucao: string = "";
    public usuario_id: string = "";    
    public entidade_id: string = "";
    public resultado: string = "";
    public atualizar_unidades: boolean = false;   
    public atualizar_servidores: boolean = false;       
    public atualizar_gestores: boolean = true;         
    public usar_arquivos_locais: boolean = false;    
    public gravar_arquivos_locais: boolean = false;

    constructor(){
        super();
    }
}