import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { PlanoEntregaPontoControleEntrega } from './plano-entrega-ponto-controle-entrega.model';
import { PlanoEntrega } from './plano-entrega.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { Usuario } from './usuario.model';

export class PlanoEntregaPontoControle extends Base {
  public entregas: PlanoEntregaPontoControleEntrega[] = [];
  public plano_entrega?: PlanoEntrega;  
  public gestor?: Usuario;
  public avaliador?: Usuario;
  public tipo_avaliacao?: TipoAvaliacao;

  public inicio: Date = new Date();                   // Data inicio do ponto de controle
  public fim: Date = new Date();                      // Data fim do ponto de controle
  public nota_atribuida: number = 0;                  // Nota da avaliação (0 - 10)
  public justificativas: LookupItem[] | null = null;  // Justificativas da avaliação
  public comentarios: string | null = null;           // Comentário referente à nota
  public plano_entrega_id: string = '';             
  public gestor_id: string | null = null;          
  public avaliador_id: string | null = null;       
  public tipo_avaliacao_id: string | null = null;  
  
  public constructor(data?: any) { super(); this.initialization(data); }
}