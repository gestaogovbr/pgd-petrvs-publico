import { Base } from './base.model';

export class Cargo extends Base {
  
    public nome: string = ""; //Nome do Cargo
    public nivel: string = ""; //Nivel do Cargo
    public descricao: string = ""; //Descricao do Cargo
    public siape: string = ""; //Códido SIAPE do Cargo
    public cbo: string = ""; //Código CBO do Cargo
    public efetivo: number = 1; //Cargo efetivo ou comissionado
    public ativo: number = 1; //Cargo esta ativo ou não
       
    public constructor(data?: any) { super(); this.initialization(data); }
}

