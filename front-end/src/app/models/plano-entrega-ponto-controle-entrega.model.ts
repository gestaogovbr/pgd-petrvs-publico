import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { PlanoEntregaPontoControle } from './plano-entrega-ponto-controle.model';

export class PlanoEntregaPontoControleEntrega extends Base {
  public plano_entrega_ponto_controle?: PlanoEntregaPontoControle;
  public plano_entrega_entrega?: PlanoEntregaEntrega;  

  public meta: LookupItem | null = null;                  // Meta para a entrega
  public realizado: LookupItem | null = null;             // Valor realizado
  public plano_entrega_ponto_controle_id: string = '';       
  public plano_entrega_entrega_id: string = '';  
  
  public constructor(data?: any) { super(); this.initialization(data); }
}