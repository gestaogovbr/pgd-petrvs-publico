import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export class PlanoEntregaEntrega extends Base {
  
  public inicio: Date = new Date();               
  public fim: Date | null = null;                 
  public descricao: string = "";                  
  public cliente: string = "";                    
  public homologado: boolean = false;                 
  public meta: LookupItem[] = [];                       
  public realizado: LookupItem[] = [];                 
  public plano_entrega_id: string | null = null;
  public entrega_id: string = '';
  public entrega_pai_id: string = '';                        
  
  public constructor(data?: any) { super(); this.initialization(data); }
}