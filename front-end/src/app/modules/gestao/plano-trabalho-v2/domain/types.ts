import { PlanoTrabalho as PlanoTrabalhoModel } from 'src/app/models/plano-trabalho.model';
import { PlanoTrabalhoEntrega as PlanoTrabalhoEntregaModel } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoConsolidacao as PlanoTrabalhoConsolidacaoModel } from 'src/app/models/plano-trabalho-consolidacao.model';

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

export type AvaliacaoConsolidacao = {
  id: string;
  data_avaliacao: string;
  nota: number;
  justificativa: string | null;
  tipo_avaliacao_nota_id: string;
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

export type Consolidacao = {
  id: string;
  status: 'INCLUIDO' | 'CONCLUIDO' | 'AVALIADO';
  data_inicio: string;
  data_fim: string;
  atividades: AtividadeConsolidacao[];
  avaliacoes: AvaliacaoConsolidacao[];
  avaliacao_id: string | null;
};
