import { Base } from './base.model';
import { PlanejamentoObjetivo } from './planejamento-objetivo.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';

export class PlanoEntregaEntregaObjetivo extends Base {
  public objetivo?: PlanejamentoObjetivo;
  public entrega?: PlanoEntregaEntrega;

  public planejamento_objetivo_id: string = '';
  public entrega_id: string = '';                        
  
  public constructor(data?: any) { super(); this.initialization(data); }
}