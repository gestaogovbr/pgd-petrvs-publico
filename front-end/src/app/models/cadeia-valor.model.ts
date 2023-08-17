import { Base } from './base.model';
import { CadeiaValorProcesso } from './cadeia-valor-processo.model';
import { Entidade } from './entidade.model';
import { Unidade } from './unidade.model';

export class CadeiaValor extends Base {

  public unidade?: Unidade;
  public entidade?: Entidade;
  public processos: CadeiaValorProcesso[] = [];

  public data_inicio: Date = new Date(); /* Data de início do planejamento */
  public data_fim: Date | null = null; /* Data do fim do planejamento */
  public data_arquivamento: Date | null = null;  /* Data de arquivamento */
  public nome: string = ""; /* Nome do plano de gestão/entregas */

  public unidade_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  public entidade_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
  
  public constructor(data?: any) { super(); this.initialization(data); }
}
