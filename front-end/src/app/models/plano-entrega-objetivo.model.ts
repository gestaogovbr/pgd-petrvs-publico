import { Base } from './base.model';
import { PlanejamentoObjetivo } from './planejamento-objetivo.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';

export class PlanoEntregaObjetivo extends Base {
  public objetivo?: PlanejamentoObjetivo;
  public entrega?: PlanoEntregaEntrega;

  public data_inicio: Date = new Date();               
  public data_fim: Date = new Date();                 
  public objetivo_id: string = '';
  public plano_entrega_entrega_id: string = '';                        
  
  public constructor(data?: any) { super(); this.initialization(data); }
}