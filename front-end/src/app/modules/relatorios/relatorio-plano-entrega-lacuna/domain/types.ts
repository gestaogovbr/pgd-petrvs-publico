export type { Page } from 'src/app/v2/domain/pagination';

export type RelatorioPlanoEntregaLacunaRow = {
  id: string;
  unidade_id: string;
  unidadeHierarquia: string;
  nome: string;
  codigo: string;
  sigla: string;
  data_inicio: string;
  data_fim: string;
  quantidade_dias: number;
  lacuna: string;
};

export type RelatorioPlanoEntregaLacunaListFilters = {
  unidade_id?: string;
  incluir_unidades_subordinadas?: boolean;
  periodo_inicio?: string;
  periodo_fim?: string;
  unidadeHierarquia?: string;
  nome?: string;
  codigo?: string;
  lacuna?: string;
  quantidade_dias?: string;
};

export type RelatorioPlanoEntregaLacunaQueryParams = {
  page?: number;
  filters?: RelatorioPlanoEntregaLacunaListFilters;
};
