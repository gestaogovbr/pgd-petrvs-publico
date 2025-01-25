import { Base } from './base.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Produto } from './produto.model';

export class PlanoEntregaEntregaProduto extends Base {
  public produto?: Produto;
  public entrega?: PlanoEntregaEntrega;

  public produto_id: string = '';
  public entrega_id: string = '';                        
  
  public constructor(data?: any) { super(); this.initialization(data); }
}