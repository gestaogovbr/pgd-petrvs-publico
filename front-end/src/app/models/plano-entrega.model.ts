import { StatusDockerConfig } from '../modules/gestao/atividade/atividade-list-kanban/atividade-list-kanban.component';
import { Base } from './base.model';
import { CadeiaValor } from './cadeia-valor.model';
import { Planejamento } from './planejamento.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Programa } from './programa.model';
import { Status } from './status.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export type PlanoEntregaMetadados = {
  incluido: boolean,
  homologando: boolean,
  ativo: boolean,
  suspenso: boolean,
  concluido: boolean,
  avaliado: boolean,
  arquivado: boolean
}
export class PlanoEntrega extends Base {
  public unidade?: Unidade;
  public status_atual?: Status = new Status();
  public planejamento?: Planejamento;
  public cadeia_valor?: CadeiaValor;
  public programa?: Programa;
  public plano_entrega?: PlanoEntrega;                              // Plano de Entrega ao qual aderiu
  public criacao_usuario?: Usuario;                                 // Usuário que criou o plano de entregas
  public cancelamento_usuario?: Usuario;                            // Usuário que cancelou o plano de entregas
  public entregas: PlanoEntregaEntrega[] = [];                      // Entregas que compõem o plano de entregas
  public statusHistorico: Status[] = [];                             // Mudanças de status sofridas pelo plano de entregas (histórico)

  public data_inicio: Date = new Date();                                 // Data inicial do plano de entrega
  public data_fim: Date | null = null;                                   // Data final do plano de entrega
  public nome: string = "";                                         // Nome do plano de entrega
  public numero?: number;                                           // Número do plano de entrega (Gerado pelo sistema)
  //public status: string = 'INCLUIDO';                               // Status do plano de entrega
  public data_cancelamento?: Date | null;
  public data_arquivamento?: Date | null;
  public metadados: PlanoEntregaMetadados | undefined = undefined;  // Campo virtual contendo informações calculadas pelo servidor

  public unidade_id: string = '';
  public plano_entrega_id: string | null = null;
  public planejamento_id: string | null = null;
  public cadeia_valor_id: string | null = null;
  public programa_id: string | null = null;
    
  public constructor(data?: any) { super(); this.initialization(data); }
}