import { Base } from './base.model';
import { Entidade } from './entidade.model';
import { Unidade } from './unidade.model';

export class CadeiaValor extends Base {

  public unidade?: Unidade;
  public entidade?: Entidade;

  public inicio: Date = new Date(); /* Data de início do planejamento */
  public fim: Date | null = null; /* Data do fim do planejamento */
  public unidade_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public entidade_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public nome: string = ""; /* Nome do plano de gestão/entregas */

  public constructor(data?: any) { super(); this.initialization(data); }
}
