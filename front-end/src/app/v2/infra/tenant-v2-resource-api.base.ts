import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import type { Page } from 'src/app/v2/domain/pagination';

/**
 * Base para clients HTTP da API tenant v2 (path absoluto a partir de {@link GlobalsService#servidorURL}).
 * Centraliza montagem de URL e parse de resposta paginada no formato Laravel.
 */
export abstract class TenantV2ResourceApiBase {
  protected readonly gb = inject(GlobalsService);
  protected readonly http = inject(HttpClient);

  /** Ex.: `/api/v2/plano-trabalho` */
  protected abstract readonly apiPath: string;

  protected resourceUrl(suffix = ''): string {
    return `${this.gb.servidorURL}${this.apiPath}${suffix}`;
  }

  /** GET na coleção raiz (`apiPath`) com query string e resposta `{ success, data: LengthAwarePaginator }`. */
  protected getCollectionPaged<T>(query: Record<string, string>, defaultPerPage: number): Observable<Page<T>> {
    return this.http.get<unknown>(this.resourceUrl(), { params: query }).pipe(
      map((response) => TenantV2ResourceApiBase.mapLaravelWrappedPage<T>(response, defaultPerPage))
    );
  }

  protected static mapLaravelWrappedPage<T>(response: unknown, defaultPerPage: number): Page<T> {
    const r = response as { data?: Record<string, unknown> };
    const data = r?.data ?? {};
    const items = Array.isArray(data['data']) ? (data['data'] as T[]) : [];
    const total = typeof data['total'] === 'number' ? data['total'] : 0;
    const page = typeof data['current_page'] === 'number' ? data['current_page'] : 1;
    const perPage =
      typeof data['per_page'] === 'number'
        ? data['per_page']
        : typeof data['size'] === 'number'
          ? (data['size'] as number)
          : defaultPerPage;
    const lastPage =
      typeof data['last_page'] === 'number'
        ? data['last_page']
        : Math.max(1, Math.ceil(total / Math.max(1, perPage)));
    return { items, total, page, perPage, lastPage };
  }
}
