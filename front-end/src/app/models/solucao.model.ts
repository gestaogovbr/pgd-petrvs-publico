import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class Solucao extends Base {
  public nome: string = ""; 
  public sigla: string = ""; 
  public unidade?: Unidade;
  public descricao?: string = ""; 
  public url?: string = ""; 
  public unidade_id: string = "";

  public constructor(data?: any) { super(); this.initialization(data); }
}

