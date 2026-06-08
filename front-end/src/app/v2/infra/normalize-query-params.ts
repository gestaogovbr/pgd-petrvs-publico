import { stringifyFilterValue } from './stringify-filter-value';

/**
 * Campos opcionais comuns na query de listagens (tenant API v2).
 * Use `Omit<..., 'filters'> & { filters?: ... }` nos módulos para tipar filtros por recurso.
 */
export type NormalizeQueryParamsInput = {
  page?: number;
  pageSize?: number;
  sort?: string;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  /** Objeto plano cujas entradas viram `filters[chave]` na query (serialização via {@link stringifyFilterValue}). */
  filters?: unknown;
};

/** Monta `Record` para `HttpClient` (`page`, `size`, ordenação, `filters[...]`). */
export function normalizeQueryParams(params: NormalizeQueryParamsInput): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof params.page === 'number') {
    out['page'] = String(params.page);
  }
  if (typeof params.pageSize === 'number') {
    out['size'] = String(params.pageSize);
  }
  if (params.sort?.length) {
    out['sort'] = params.sort;
  }
  if (params.orderBy?.length) {
    out['order_by'] = params.orderBy;
  }
  if (params.orderDir?.length) {
    out['order_dir'] = params.orderDir;
  }
  const filters = params.filters;
  if (
    filters != null &&
    typeof filters === 'object' &&
    !Array.isArray(filters) &&
    !(filters instanceof Date)
  ) {
    Object.entries(filters as Record<string, unknown>).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        out[`filters[${k}]`] = stringifyFilterValue(v);
      }
    });
  }
  return out;
}
