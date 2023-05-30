import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Entrega, EntregaValor } from './entrega.model';
import { PlanoEntregaObjetivo } from './plano-entrega-objetivo.model';
import { PlanoEntregaProcesso } from './plano-entrega-processo.model';

export class PlanoEntregaEntrega extends Base {
  public entrega?: Entrega;

  public inicio: Date = new Date();               
  public fim: Date | null = null;                               
  public descricao: string = "";                                      
  public homologado: boolean = false;                 
  public meta: EntregaValor = {}; 
  public realizado: EntregaValor = {};
  public plano_entrega_id: string | null = null;
  public entrega_id: string = '';
  public progresso_esperado: string = '';                        
  public progresso_realizado: string = '';                        
  public descricao_meta: string = '';                        
  public unidade_id: string = '';                        
  public destinatario: string = '';                        
  public entrega_pai_id: string = '';                        
  public objetivos: PlanoEntregaObjetivo[] = [];
  public processos: PlanoEntregaProcesso[] = [];
  
  public constructor(data?: any) { super(); this.initialization(data); }
}