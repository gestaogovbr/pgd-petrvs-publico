import { Base } from './base.model';
import { Curriculum } from './curriculum.model';

export class Cidade extends Base {
  public curriculuns?: Curriculum[];

  public codigo_ibge: string = ""; //Código IBGE
  public nome: string = ""; //Nome da cidade;
  public tipo: string = "MUNICIPIO"; //Tipo: MUNICIPIO, DISTRITO, CAPITAL");
  public uf: string = "AC"; //Unidade da federação
  public timezone: number = 0; //Timezone da cidade

  public constructor(data?: any) { super(); this.initialization(data); }
}