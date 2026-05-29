import { PlanoTrabalho as PlanoTrabalhoModel, PlanoTrabalhoStatus } from 'src/app/models/plano-trabalho.model';
import { PlanoTrabalhoEntrega as PlanoTrabalhoEntregaModel } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoConsolidacao as PlanoTrabalhoConsolidacaoModel } from 'src/app/models/plano-trabalho-consolidacao.model';
import type { NormalizeQueryParamsInput } from 'src/app/v2/infra/normalize-query-params';

export type PlanoTrabalhoId = string;
export type PlanoTrabalho = PlanoTrabalhoModel;
export type PlanoTrabalhoEntrega = PlanoTrabalhoEntregaModel;
export type PlanoTrabalhoConsolidacao = PlanoTrabalhoConsolidacaoModel;

export type PlanoTrabalhoCreatePayload = {
  usuario_id: string;
  unidade_id: string;
  programa_id: string;
  data_inicio: string;
  data_fim: string;
  modalidade_pgd: string;
  justificativa_modalidade?: string | null;
};

export type { Page } from 'src/app/v2/domain/pagination';

export type QueryParams = Omit<NormalizeQueryParamsInput, 'filters'> & {
  filters?: Record<string, unknown>;
};

export type PlanoTrabalhoAuditLog = {
  id: string;
  event: string;
  auditable_type: string;
  auditable_type_class: string;
  usuario: string;
  created_at: string;
  old_values: Record<string, unknown>;
  new_values: Record<string, unknown>;
};

export type PlanoTrabalhoLogModelOption = {
  key: string;
  value: string;
};

export type PlanoTrabalhoLogsQueryParams = {
  page?: number;
  size?: number;
  filters?: {
    usuario_id?: string;
    usuario_nome?: string;
    data_inicio?: string;
    data_fim?: string;
    event?: string;
    search?: string;
    modelo?: string;
  };
};

export type TipoMotivoAfastamento = {
  id: string;
  nome: string;
  sigla: string;
  horas: number;
};

export type Ocorrencia = {
  id: string;
  observacoes: string | null;
  data_inicio: string;
  data_fim: string;
  horas: number | null;
  tipo_motivo_afastamento_id: string;
  tipo_motivo_afastamento?: TipoMotivoAfastamento;
};

export type OcorrenciaFormValue = {
  observacoes: string;
  data_inicio: string;
  data_fim: string;
  tipo_motivo_afastamento_id: string;
  horas: string;
};

export function getPlanoEntregaInfo(e: PlanoTrabalhoEntrega | any): { plano: string; entrega: string } {
  if (e.orgao) return { plano: 'Outro Órgão/Entidade', entrega: e.orgao };
  if (!e.plano_entrega_entrega_id) return { plano: 'Não vinculada', entrega: '-' };
  if (e.plano_entrega_entrega) {
    return {
      plano: (e.plano_entrega_entrega as any).plano_entrega?.nome || 'Plano vinculado',
      entrega: (e.plano_entrega_entrega as any).descricao || 'Entrega vinculada'
    };
  }
  return { plano: 'Plano vinculado', entrega: 'Entrega vinculada' };
}

const PLANO_TRABALHO_STATUS_LABELS: Record<PlanoTrabalhoStatus, string> = {
  ATIVO: 'Em execução',
  INCLUIDO: 'Rascunho',
  AGUARDANDO_ASSINATURA: 'Aguardando assinatura',
  SUSPENSO: 'Suspenso',
  CANCELADO: 'Cancelado',
  CONCLUIDO: 'Concluído',
  AVALIADO: 'Avaliado',
};

export function planoTrabalhoStatusLabel(status: PlanoTrabalhoStatus | undefined, plano?: PlanoTrabalho): string {
  if (!status) return '-';
  if (status === 'CONCLUIDO' && plano?.encerrado_at) return 'Encerrado antecipadamente';
  return PLANO_TRABALHO_STATUS_LABELS[status] ?? status;
}

export type AvaliacaoConsolidacao = {
  id: string;
  data_avaliacao: string;
  nota: number;
  justificativa: string | null;
  tipo_avaliacao_nota_id: string;
  tipo_avaliacao_nota?: { id: string; aprova: number };
  avaliador?: { id: string; nome: string };
  recurso: string | null;
  data_recurso: string | null;
};

export type NotaAvaliacao = {
  id: string;
  nota: string;
  sequencia: number;
  justifica: number;
};

export type AtividadeConsolidacao = {
  id: string;
  plano_trabalho_entrega_id: string;
  descricao: string;
  created_at?: string;
  updated_at?: string;
};

export type ConsolidacaoStatus = 'INCLUIDO' | 'CONCLUIDO' | 'AVALIADO';

export const ConsolidacaoStatus = {
  INCLUIDO: 'INCLUIDO',
  CONCLUIDO: 'CONCLUIDO',
  AVALIADO: 'AVALIADO',
} as const satisfies Record<ConsolidacaoStatus, ConsolidacaoStatus>;

type ConsolidacaoStatusGroupName =
  | 'emRegistro'
  | 'fechados'
  | 'reabrivel'
  | 'avaliavel'
  | 'avaliada';

export const ConsolidacaoStatusGroups: Record<ConsolidacaoStatusGroupName, readonly ConsolidacaoStatus[]> = {
  emRegistro: [ConsolidacaoStatus.INCLUIDO],
  fechados: [ConsolidacaoStatus.CONCLUIDO, ConsolidacaoStatus.AVALIADO],
  reabrivel: [ConsolidacaoStatus.CONCLUIDO],
  avaliavel: [ConsolidacaoStatus.CONCLUIDO],
  avaliada: [ConsolidacaoStatus.AVALIADO],
};

export type Consolidacao = {
  id: string;
  status: ConsolidacaoStatus;
  data_inicio: string;
  data_fim: string;
  atividades: AtividadeConsolidacao[];
  avaliacoes: AvaliacaoConsolidacao[];
  avaliacao_id: string | null;
  ocorrencias: Ocorrencia[];
};
