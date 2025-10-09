
import { Base } from './base.model';
import { Entrega, EntregaValor } from './entrega.model';
import { HasMetaRealizado, PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Usuario } from './usuario.model';

export class PlanoEntregaEntregaProgresso extends Base implements HasMetaRealizado  {
  public plano_entrega_entrega?: PlanoEntregaEntrega;
  public entrega?: Entrega;
  public usuario?: Usuario;

  public data_inicio: Date = new Date();
  public data_fim: Date | null = null;
  public data_progresso: Date | null = null;
  public homologado: boolean = false;
  public meta: EntregaValor = {};
  public realizado: EntregaValor = {};
  public progresso_esperado: number = 100;
  public progresso_realizado: number = 0;
  public registro_execucao?: string;

  public plano_entrega_entrega_id: string = '';
  public usuario_id: string = '';                  
  
  public constructor(data?: any) { super(); this.initialization(data); }
}