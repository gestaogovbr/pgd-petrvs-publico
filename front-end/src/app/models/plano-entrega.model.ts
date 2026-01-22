import { StatusDockerConfig } from '../modules/gestao/atividade/atividade-list-kanban/atividade-list-kanban.component';
import { Avaliacao, HasAvaliacao } from './avaliacao.model';
import { Base } from './base.model';
import { CadeiaValor } from './cadeia-valor.model';
import { Planejamento } from './planejamento.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Programa } from './programa.model';
import { HasStatus, StatusJustificativa } from './status-justificativa.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export type PlanoEntregaStatus = 'INCLUIDO' | 'HOMOLOGANDO' | 'ATIVO' | 'CONCLUIDO' | 'AVALIADO' | 'SUSPENSO' | 'CANCELADO';

export type PlanoEntregaMetadados = {
  incluido: boolean,
  homologando: boolean,
  ativo: boolean,
  suspenso: boolean,
  concluido: boolean,
  avaliado: boolean,
  arquivado: boolean
}

export class PlanoEntrega extends Base implements HasStatus, HasAvaliacao {
  public avaliacao?: Avaliacao;
  public unidade?: Unidade;
  public planejamento?: Planejamento;
  public cadeia_valor?: CadeiaValor;
  public programa?: Programa;
  public plano_entrega?: PlanoEntrega;                              // Plano de Entrega ao qual aderiu
  public criacao_usuario?: Usuario;                                 // Usuário que criou o plano de entregas
  public cancelamento_usuario?: Usuario;                            // Usuário que cancelou o plano de entregas
  public entregas: PlanoEntregaEntrega[] = [];                      // Entregas que compõem o plano de entregas
  public status_historico: StatusJustificativa[] = [];              // Mudanças de status sofridas pelo plano de entregas (histórico)

  public data_inicio: Date = new Date();                            // Data inicial do plano de entrega
  public data_fim: Date | null = null;                              // Data final do plano de entrega
  public nome: string = "";                                         // Nome do plano de entrega
  public numero?: number;                                           // Número do plano de entrega (Gerado pelo sistema)
  public data_arquivamento?: Date | null;
  public metadados: PlanoEntregaMetadados | undefined = undefined;  // Campo virtual contendo informações calculadas pelo servidor
  public arquivar: boolean = false;                                 // Campo virtual utilizado pelos métodos arquivar/desarquivar/avaliar
  public status: PlanoEntregaStatus = "INCLUIDO";                   // Status atual do plano de entregas
  public avaliacoes: Avaliacao[] = [];

  public unidade_id: string = '';
  public avaliacao_id: string | null = null;
  public plano_entrega_id: string | null = null;
  public planejamento_id: string | null = null;
  public cadeia_valor_id: string | null = null;
  public programa_id: string | null = null;
	public has_progresso: boolean = false;
    
  public constructor(data?: any) { super(); this.initialization(data); }
}