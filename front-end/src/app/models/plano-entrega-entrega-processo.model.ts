import { Base } from './base.model';
import { CadeiaValorProcesso } from './cadeia-valor-processo.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';

export class PlanoEntregaEntregaProcesso extends Base {
  public processo?: CadeiaValorProcesso;
  public entrega?: PlanoEntregaEntrega;

  public cadeia_processo_id: string = '';
  public entrega_id: string = '';                        
  
  public constructor(data?: any) { super(); this.initialization(data); }
}