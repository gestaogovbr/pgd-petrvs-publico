import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TipoObjetivo, TipoObjetivoPayload, Estrutura } from '../domain/types';
import { GlobalsService } from 'src/app/services/globals.service';

type ApiResponse<T> = {
  data?: T;
};

@Injectable({ providedIn: 'root' })
export class TipoObjetivoApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v2/planejamento/tipo-objetivo';
  private readonly gb = inject(GlobalsService);

  list(estrutura?: Estrutura): Observable<TipoObjetivo[]> {
    let params = new HttpParams();
    if (estrutura) {
      params = params.set('estrutura', estrutura);
    }

    return this.http
      .get<ApiResponse<TipoObjetivo[]>>(`${this.gb.servidorURL}${this.base}`, { params })
      .pipe(map(response => (Array.isArray(response?.data) ? response.data : [])));
  }

  create(payload: TipoObjetivoPayload): Observable<TipoObjetivo> {
    return this.http
      .post<ApiResponse<TipoObjetivo>>(`${this.gb.servidorURL}${this.base}`, payload)
      .pipe(map(response => response.data as TipoObjetivo));
  }

  update(id: string, payload: TipoObjetivoPayload): Observable<TipoObjetivo> {
    return this.http
      .put<ApiResponse<TipoObjetivo>>(`${this.gb.servidorURL}${this.base}/${id}`, payload)
      .pipe(map(response => response.data as TipoObjetivo));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${id}`);
  }
}
