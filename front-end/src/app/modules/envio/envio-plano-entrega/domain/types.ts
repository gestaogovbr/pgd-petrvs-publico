export type { Page } from 'src/app/v2/domain/pagination';

export type EnvioPlanoEntregaRow = {
  id: string;
  numero: number | string;
  nome: string | null;
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

export type EnvioPlanoEntregaListFilters = {
  numero?: string;
  nome?: string;
  unidade_id?: string;
  status?: string;
  alteracao_inicio?: string;
  alteracao_fim?: string;
  conclusao_inicio?: string;
  conclusao_fim?: string;
  envio_inicio?: string;
  envio_fim?: string;
};

export type EnvioPlanoEntregaQueryParams = {
  page?: number;
  filters?: EnvioPlanoEntregaListFilters;
};
