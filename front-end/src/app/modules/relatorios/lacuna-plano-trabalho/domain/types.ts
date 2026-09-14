export type { Page } from 'src/app/v2/domain/pagination';

export type LacunaPlanoTrabalhoRow = {
  id: string;
  usuario_id: string;
  nome: string;
  nome_exibicao: string;
  matricula: string | null;
  unidadeLotacao: string | null;
  unidadeNome: string | null;
  unidadeHierarquia: string | null;
  lacuna: string;
  lacuna_inicio: string;
  lacuna_fim: string;
  quantidade_dias: number;
  ocorrencias_texto: string;
};

export type LacunaPlanoTrabalhoListFilters = {
  unidade_id: string;
  periodo_inicio: string;
  periodo_fim: string;
  incluir_unidades_subordinadas?: boolean;
  nome?: string;
  matricula?: string;
  unidadeHierarquia?: string;
  lacuna?: string;
  quantidade_dias?: number | string;
  ocorrencias_texto?: string;
};

export type LacunaPlanoTrabalhoQueryParams = {
  page?: number;
  filters?: LacunaPlanoTrabalhoListFilters;
};
