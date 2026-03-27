import { PlanoTrabalho as PlanoTrabalhoModel } from 'src/app/models/plano-trabalho.model';
import { PlanoTrabalhoEntrega as PlanoTrabalhoEntregaModel } from 'src/app/models/plano-trabalho-entrega.model';

export type PlanoTrabalhoId = string;
export type PlanoTrabalho = PlanoTrabalhoModel;
export type PlanoTrabalhoEntrega = PlanoTrabalhoEntregaModel;

export type PlanoTrabalhoCreatePayload = {
  usuario_id: string;
  unidade_id: string;
  programa_id: string;
  data_inicio: string;
  data_fim: string;
  tipo_modalidade_id: string;
};

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
};

export type QueryParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  filters?: Record<string, unknown>;
};
