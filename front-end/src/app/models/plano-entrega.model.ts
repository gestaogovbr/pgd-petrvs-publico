import { Base } from './base.model';

export class PlanoEntrega extends Base {
  public inicio: Date = new Date();               // Data inicio do plano de entrega
  public fim: Date | null = null;                 // Data fim do plano de entrega
  public nome: string = "";                       // Nome do plano de entrega
  public planejamento_id: string | null = null;
  public cadeia_valor_id: string | null = null;
  public unidade_id: string = '';
  public numero: number = 0;                          // Número do plano de entrega (Gerado pelo sistema)
  
  public constructor(data?: any) { super(); this.initialization(data); }
}