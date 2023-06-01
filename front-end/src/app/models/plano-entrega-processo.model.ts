import { Base } from './base.model';
import { CadeiaValorProcesso } from './cadeia-valor-processo.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';

export class PlanoEntregaProcesso extends Base {
  public processo?: CadeiaValorProcesso;
  public entrega?: PlanoEntregaEntrega;

  public data_inicio: Date = new Date();               
  public data_fim: Date = new Date();                 
  public processo_id: string = '';
  public plano_entrega_entrega_id: string = '';                        
  
  public constructor(data?: any) { super(); this.initialization(data); }
}