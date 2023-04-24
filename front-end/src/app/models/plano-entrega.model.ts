import { Base } from './base.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';

export class PlanoEntrega extends Base {
  public entregas?: PlanoEntregaEntrega[];

  public inicio: Date = new Date();               // Data inicio do plano de entrega
  public fim: Date | null = null;                 // Data fim do plano de entrega
  public nome: string = "";                       // Nome do plano de entrega
  public unidade_id: string = '';
  public numero: number = 0;                      // Número do plano de entrega (Gerado pelo sistema)
  public planejamento_id: string | null = null;
  public cadeia_valor_id: string | null = null;
  
  public constructor(data?: any) { super(); this.initialization(data); }
}