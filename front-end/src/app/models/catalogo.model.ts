import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class Catalogo extends Base {
  public nome: string = ""; 
  public unidade?: Unidade;
  public curadorResponsavel?: Usuario;
  public data_inicio: Date = new Date(); 
  public data_fim: Date = new Date(); 

  public curador_responsavel_id: string = "";
  public unidade_id: string = "";

  public constructor(data?: any) { super(); this.initialization(data); }
}

