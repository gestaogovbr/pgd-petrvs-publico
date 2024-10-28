import { Base } from './base.model';

export class EnvioItem extends Base { 
    public uid: string = "";
    public tipo: string = "";
    public fonte: string = "";
    public sucesso: boolean = false;
    public erros: string = "";

    constructor(){
        super();
    }
}
