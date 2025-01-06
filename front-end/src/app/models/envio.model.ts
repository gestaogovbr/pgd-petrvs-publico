import { Base } from './base.model';

export class Envio extends Base {
    public numero: string = "";  
    public finished_at: string = ""; 
    public sucesso: boolean = false;   
    public erros: string = "";  
    public qtde_participantes_sucessos: number = 0;   
    public qtde_participantes_falhas: number = 0;  
    public qtde_entregas_sucessos: number = 0;   
    public qtde_entregas_falhas: number = 0;
    public qtde_trabalhos_sucessos: number = 0;   
    public qtde_trabalhos_falhas: number = 0; 

    constructor() {
        super();
    }
}
