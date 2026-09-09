export interface RelatorioEntregaRow {
  id: string;
  unidade_id: string;
  unidadeHierarquia: string;
  demandanteHierarquia: string;
  destinatario: string;
  entregaNome: string;
  data_inicio: string | null;
  data_fim: string | null;
  meta_planejado: number;
  meta_alcancado: number;
  meta_tipo: string;
  meta_percentual: number;
  qtd_planejamento_institucional: number;
  qtd_cadeia_valor: number;
  qtd_outras_entregas: number;
  situacao: string;
  plano_id: string;
  plano_numero: string;
  plano_nome: string;
  plano_rotulo: string;
  plano_status: string;
  qtd_participantes: number;
  qtd_planos_trabalho: number;
}

export interface RelatorioEntregaListFilters {
  unidade_id?: string;
  incluir_unidades_subordinadas?: boolean;
  periodo_inicio?: string;
  periodo_fim?: string;
}

export type RelatorioEntregaSortColumn =
  | 'unidadeHierarquia'
  | 'demandanteHierarquia'
  | 'destinatario'
  | 'entregaNome'
  | 'data_inicio'
  | 'data_fim'
  | 'meta_planejado'
  | 'meta_alcancado'
  | 'meta_tipo'
  | 'meta_percentual'
  | 'qtd_planejamento_institucional'
  | 'qtd_cadeia_valor'
  | 'qtd_outras_entregas'
  | 'situacao'
  | 'plano_nome'
  | 'plano_rotulo'
  | 'plano_numero'
  | 'plano_status'
  | 'qtd_participantes'
  | 'qtd_planos_trabalho';

export interface RelatorioEntregaQueryParams {
  page?: number;
  orderBy?: RelatorioEntregaSortColumn;
  orderDir?: 'asc' | 'desc';
  filters?: RelatorioEntregaListFilters;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

export const RELATORIO_ENTREGA_PERMISSAO = 'MOD_RELATORIO_ENTREGA';
export const RELATORIO_ENTREGA_PERMISSAO_PE = 'MOD_RELATORIO_PE';
