import { Base } from './base.model';
import { CadeiaValor } from './cadeia-valor.model';

export class CadeiaValorProcesso extends Base {
  public cadeiaValor?: CadeiaValor;

  public data_inicio: Date = new Date(); /* Data de início do planejamento */
  public data_fim: Date | null = null; /* Data do fim do planejamento */
  public path: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public cadeia_valor_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public processo_pai_id: string | null = null; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public nome: string = ""; /* Nome do plano de gestão/entregas */
  public sequencia: number = 0; /* Nome do plano de gestão/entregas */

  public constructor(data?: any) { super(); this.initialization(data); }
}
