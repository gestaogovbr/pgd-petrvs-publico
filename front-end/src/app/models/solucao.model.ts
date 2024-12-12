import { Base } from './base.model';

export class Solucao extends Base {
  public identificador: number = 0;
  public nome: string = ""; 
  public sigla: string = ""; 
  public descricao?: string = ""; 
  public url?: string = ""; 

  public constructor(data?: any) { super(); this.initialization(data); }
}

