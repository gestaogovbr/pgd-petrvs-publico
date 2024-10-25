import { Base } from './base.model';

export class Envio extends Base {
    public finished_at: string = ""; 
    public sucesso: boolean = false;   
    public erros: string = "";  

    constructor(){
        super();
    }
}
