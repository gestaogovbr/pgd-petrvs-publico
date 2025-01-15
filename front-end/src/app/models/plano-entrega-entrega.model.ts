import { LookupItem } from '../services/lookup.service';
import { Checklist } from './atividade.model';
import { Avaliacao, HasAvaliacao } from './avaliacao.model';
import { Base } from './base.model';
import { Comentario, HasComentarios } from './comentario';
import { Entrega, EntregaValor } from './entrega.model';
import { PlanoEntregaEntregaObjetivo } from './plano-entrega-entrega-objetivo.model';
import { PlanoEntregaEntregaProcesso } from './plano-entrega-entrega-processo.model';
import { PlanoEntregaEntregaProduto } from './plano-entrega-entrega-produto.model';
import { PlanoEntrega } from './plano-entrega.model';
import { PlanoTrabalhoEntrega } from './plano-trabalho-entrega.model';
import { Produto } from './produto.model';
import { HasReacoes, Reacao } from './reacao';
import { Unidade } from './unidade.model';

export interface HasMetaRealizado {
  entrega?: Entrega;
  meta: EntregaValor;
  realizado: EntregaValor;
};

export class PlanoEntregaEntrega extends Base implements HasAvaliacao, HasMetaRealizado, HasComentarios, HasReacoes {
  public entrega?: Entrega;
  public entrega_pai?: Entrega;
  public plano_entrega?: PlanoEntrega;
  public avaliacao?: Avaliacao;
  public unidade?: Unidade;
  public objetivos: PlanoEntregaEntregaObjetivo[] = [];
  public processos: PlanoEntregaEntregaProcesso[] = [];
  public produtos: PlanoEntregaEntregaProduto[] = [];
  public entregas_plano_trabalho?: PlanoTrabalhoEntrega[];

  public data_inicio: Date = new Date();
  public data_fim: Date | null = null;
  public descricao: string = "";
  public descricao_meta: string = "";
  public descricao_entrega: string = "";
  public homologado: boolean = false;
  public meta: EntregaValor = {};
  public realizado: EntregaValor = {};
  public progresso_esperado: number = 100;
  public progresso_realizado: number = 0;
  public destinatario: string = '';
  public avaliacoes: Avaliacao[] = [];
  public comentarios: Comentario[] = []; /* Comentarios da etrega */
  public reacoes: Reacao[] = []; /* Reações da entrega */
  public etiquetas: LookupItem[] = []; /* Etiquetas */
  public checklist: Checklist[] = []; /* Checklist */

  public entrega_id: string = '';
  public unidade_id: string = '';                        
  public entrega_pai_id: string | null = null;                      
  public avaliacao_id: string | null = null;
  public plano_entrega_id: string | null = null;
  
  public constructor(data?: any) { super(); this.initialization(data); }
}