import { Base } from './base.model';

export class SiapeBlacklistServidor extends Base {
    public cpf: string = ""; 
    public inativado: boolean = false; 

    public constructor(data?: any) { 
        super(); 
        this.initialization(data); 
    }
}