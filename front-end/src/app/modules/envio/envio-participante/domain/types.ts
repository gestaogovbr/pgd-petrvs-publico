export type { Page } from 'src/app/v2/domain/pagination';

/** Linha retornada pela listagem de envios de participante (API v2). */
export type EnvioParticipanteRow = {
  id: string;
  cpf: string | null;
  nome: string | null;
  matricula: string | null;
  updated_at: string | null;
  data_agendamento_envio: string | null;
  data_tentativa_envio: string | null;
  data_conclusao_envio: string | null;
  data_envio_api_pgd: string | null;
  log_envio: string | null;
};

/** Filtros da listagem (enviados como `filters[chave]` na query da API). */
export type EnvioParticipanteListFilters = {
  cpf?: string;
  nome?: string;
  status?: string;
  alteracao_inicio?: string;
  alteracao_fim?: string;
  conclusao_inicio?: string;
  conclusao_fim?: string;
  envio_inicio?: string;
  envio_fim?: string;
};

/** Parâmetros da listagem (`page` + `filters` na query). */
export type EnvioParticipanteQueryParams = {
  page?: number;
  filters?: EnvioParticipanteListFilters;
};
