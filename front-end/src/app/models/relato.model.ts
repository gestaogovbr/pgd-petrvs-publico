import { Base } from './base.model';

export class Relato extends Base {
    public opcao: string = ""; 
    public usuario_id: string|null = null; 
    public unidade_id: string|null = null; 
    public nome: string = ""; 
    public cpf: string = ""; 
    public matricula: string = ""; 
    public descricao: string = ""; 

    public constructor(data?: any) { super(); this.initialization(data); }
}