import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TipoObjetivo, TipoObjetivoPayload } from '../domain/types';

type ApiResponse<T> = {
  data?: T;
};

@Injectable()
export class TipoObjetivoApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = 'api/v2/tipo-objetivo';

  list(): Observable<TipoObjetivo[]> {
    return this.http
      .get<ApiResponse<TipoObjetivo[]>>(this.base)
      .pipe(map(response => (Array.isArray(response?.data) ? response.data : [])));
  }

  create(payload: TipoObjetivoPayload): Observable<TipoObjetivo> {
    return this.http
      .post<ApiResponse<TipoObjetivo>>(this.base, payload)
      .pipe(map(response => response.data as TipoObjetivo));
  }

  update(id: string, payload: TipoObjetivoPayload): Observable<TipoObjetivo> {
    return this.http
      .put<ApiResponse<TipoObjetivo>>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.data as TipoObjetivo));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
