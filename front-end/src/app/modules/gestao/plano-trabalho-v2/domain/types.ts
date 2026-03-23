export type PlanoTrabalhoId = string;

export type PlanoTrabalho = {
  id: PlanoTrabalhoId;
  numero: number;
  usuario_id: string;
  criacao_usuario_id: string;
  documento_id: string;
  unidade_id: string;
  programa_id: string; // Programa ou Regramento
  tipo_modalidade_id: string;
  data_inicio: Date;
  data_fim: Date;
  data_arquivamento?: Date;
  avaliado_at?: Date;
  status: string;
};

export type PlanoTrabalhoEntrega = {
  id: string;
  descricao: string;
  plano_trabalho_id: PlanoTrabalhoId;
  plano_entrega_entrega_id?: string;
  forca_trabalho: number;
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
