export interface TipoObjetivo {
  id: string;
  nome: string;
  descricao: string | null;
}

export interface TipoObjetivoPayload {
  nome: string;
  descricao: string | null;
}
