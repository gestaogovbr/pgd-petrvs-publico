export type Estrutura = 'planejamento_institucional' | 'cadeia_de_valor';

export interface TipoObjetivo {
  id: string;
  nome: string;
  descricao: string | null;
  estrutura: Estrutura;
}

export interface TipoObjetivoPayload {
  nome: string;
  descricao: string | null;
  estrutura: Estrutura;
}
