/** Resultado paginado genérico (listagens API v2). */
export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
};
