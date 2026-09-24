import type { Page } from 'src/app/v2/domain/pagination';

export { Page };

export enum RelatorioGeracaoStatus {
  PROCESSANDO = 'PROCESSANDO',
  CONCLUIDA = 'CONCLUIDA',
  ERRO = 'ERRO',
}

export enum RelatorioGeracaoTipo {
  PLANO_TRABALHO = 'plano_trabalho',
  PLANO_TRABALHO_DETALHADO = 'plano_trabalho_detalhado',
}

export const RELATORIO_GERACAO_GRUPO = {
  PLANOS_TRABALHO: 'planos_trabalho',
} as const;

export type RelatorioGeracaoGrupo = (typeof RELATORIO_GERACAO_GRUPO)[keyof typeof RELATORIO_GERACAO_GRUPO];

export const RELATORIO_GERACAO_GRUPO_LABEL: Record<RelatorioGeracaoGrupo, string> = {
  [RELATORIO_GERACAO_GRUPO.PLANOS_TRABALHO]: 'Planos de Trabalho',
};

export const RELATORIO_GERACAO_TIPO_GRUPO: Record<RelatorioGeracaoTipo, RelatorioGeracaoGrupo> = {
  [RelatorioGeracaoTipo.PLANO_TRABALHO]: RELATORIO_GERACAO_GRUPO.PLANOS_TRABALHO,
  [RelatorioGeracaoTipo.PLANO_TRABALHO_DETALHADO]: RELATORIO_GERACAO_GRUPO.PLANOS_TRABALHO,
};

export function grupoRelatorio(tipo: string | null | undefined): RelatorioGeracaoGrupo | null {
  if (!tipo) {
    return null;
  }
  if (tipo === RELATORIO_GERACAO_GRUPO.PLANOS_TRABALHO) {
    return RELATORIO_GERACAO_GRUPO.PLANOS_TRABALHO;
  }
  if (tipo === RelatorioGeracaoTipo.PLANO_TRABALHO || tipo === RelatorioGeracaoTipo.PLANO_TRABALHO_DETALHADO) {
    return RELATORIO_GERACAO_TIPO_GRUPO[tipo];
  }
  return null;
}

export function nomeRelatorioExibicao(row: { tipo?: string; nome?: string }): string {
  const grupo = grupoRelatorio(row.tipo);
  return grupo ? RELATORIO_GERACAO_GRUPO_LABEL[grupo] : row.nome || '';
}

export function normalizarStatusRelatorio(status: unknown): string {
  if (typeof status === 'string') {
    return status.trim().toUpperCase();
  }
  if (status && typeof status === 'object') {
    const record = status as { value?: unknown };
    if (typeof record.value === 'string') {
      return record.value.trim().toUpperCase();
    }
  }
  return '';
}

export function relatorioEstaConcluido(row: Pick<RelatorioGeracaoRow, 'status'>): boolean {
  return normalizarStatusRelatorio(row.status) === RelatorioGeracaoStatus.CONCLUIDA;
}

export function relatorioEstaProcessando(row: Pick<RelatorioGeracaoRow, 'status'>): boolean {
  return normalizarStatusRelatorio(row.status) === RelatorioGeracaoStatus.PROCESSANDO;
}

export function progressoPercentual(row: Pick<RelatorioGeracaoRow, 'progresso_pagina' | 'progresso_total' | 'progresso_percentual'>): number {
  if (typeof row.progresso_percentual === 'number' && Number.isFinite(row.progresso_percentual)) {
    return Math.min(100, Math.max(0, Math.floor(row.progresso_percentual)));
  }
  const total = row.progresso_total ?? 0;
  const pagina = row.progresso_pagina ?? 0;
  if (total <= 0) {
    return 0;
  }
  return Math.min(100, Math.floor((pagina / total) * 100));
}

export const RELATORIO_GERACAO_STATUS_LABEL: Record<RelatorioGeracaoStatus, string> = {
  [RelatorioGeracaoStatus.PROCESSANDO]: 'Em processamento',
  [RelatorioGeracaoStatus.CONCLUIDA]: 'Concluída',
  [RelatorioGeracaoStatus.ERRO]: 'Erro',
};

export type RelatorioGeracaoSortColumn = 'nome' | 'iniciado_em' | 'finalizado_em' | 'status';

export interface RelatorioGeracaoRow {
  id: string;
  tipo: string;
  nome: string;
  status: RelatorioGeracaoStatus | string;
  status_label: string;
  iniciado_em: string | null;
  finalizado_em: string | null;
  arquivo_nome: string | null;
  erro_mensagem: string | null;
  progresso_pagina?: number;
  progresso_total?: number | null;
  progresso_percentual?: number;
}

/** Filtros da listagem (enviados como `filters[chave]` na query da API). */
export interface RelatorioGeracaoListFilters {
  tipo?: RelatorioGeracaoGrupo | RelatorioGeracaoTipo | string;
  status?: RelatorioGeracaoStatus | string;
  geracao_inicio?: string;
  geracao_fim?: string;
}

export interface RelatorioGeracaoQueryParams {
  page?: number;
  orderBy?: RelatorioGeracaoSortColumn;
  orderDir?: 'asc' | 'desc';
  filters?: RelatorioGeracaoListFilters;
}
