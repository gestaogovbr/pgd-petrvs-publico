import { Base } from './base.model';
import { CadeiaValor } from './cadeia-valor.model';

export class CadeiaValorProcesso extends Base {
  find(arg0: (x: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  public cadeia_valor?: CadeiaValor;
  public processo_pai?: CadeiaValorProcesso;

  public path: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public nome: string = ""; /* Nome do plano de gestão/entregas */
  public sequencia: number = 0; /* Nome do plano de gestão/entregas */
  public sequencia_completa: string = '';
  public cadeia_valor_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public processo_pai_id: string | null = null; /* Unidade à qual está vinculado o plano de gestão/entregas */

  public constructor(data?: any) { super(); this.initialization(data); }
}
  