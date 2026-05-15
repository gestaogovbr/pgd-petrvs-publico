export type { Page } from 'src/app/v2/domain/pagination';

/** Linha retornada pela listagem de envios de plano de trabalho (API v2). */
export type EnvioPlanoTrabalhoRow = {
  id: string;
  numero: number | string;
  data_inicio: string | null;
  data_fim: string | null;
  updated_at: string | null;
  data_agendamento_envio: string | null;
  data_tentativa_envio: string | null;
  data_conclusao_envio: string | null;
  data_envio_api_pgd: string | null;
  log_envio: string | null;
  unidade: { id: string; sigla: string } | null;
  programa: { id: string; nome: string } | null;
};

/** Filtros da listagem (enviados como `filters[chave]` na query da API). */
export type EnvioPlanoTrabalhoListFilters = {
  numero?: string;
  unidade_id?: string;
  status?: string;
  alteracao_inicio?: string;
  alteracao_fim?: string;
  conclusao_inicio?: string;
  conclusao_fim?: string;
  envio_inicio?: string;
  envio_fim?: string;
};

/** Parâmetros da listagem (`page` + `filters` na query). */
export type EnvioPlanoTrabalhoQueryParams = {
  page?: number;
  filters?: EnvioPlanoTrabalhoListFilters;
};
