export type PlanoTrabalhoId = string;

export type PlanoTrabalho = {
  id: PlanoTrabalhoId;
  numero: string;
  nome: string;
  unidade_id: string;
  modalidade?: string;
  status?: string;
};

export type Entrega = {
  id: string;
  nome: string;
  plano_trabalho_id: PlanoTrabalhoId;
  status?: string;
};

export type Page<T> = {
  items: T[];
  total: number;
};

export type QueryParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: Record<string, unknown>;
  includes?: string[];
};
