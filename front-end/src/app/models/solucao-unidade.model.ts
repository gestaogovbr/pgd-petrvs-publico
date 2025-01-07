import { Base } from './base.model';
import { Solucao } from './solucao.model';
import { Unidade } from './unidade.model';

export class SolucaoUnidade extends Base {
  public unidade?: Unidade;
  public solucao?: Solucao;
  public id_unidade: string = ""; 
  public id_solucao: string = ""; 
  public status: boolean = true; 

  public constructor(data?: any) { super(); this.initialization(data); }
}

