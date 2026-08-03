import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalsService } from '../services/globals.service';
import { MuralAviso } from '../v2/domain/mural-aviso.types';

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

interface SingleResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class MuralAvisoApiClient {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = '/api/mural-aviso';

  listar(): Observable<PaginatedResponse<MuralAviso>> {
    return this.http.get<PaginatedResponse<MuralAviso>>(`${this.gb.servidorURL}${this.base}`);
  }

  buscarPorId(id: string): Observable<MuralAviso> {
    return this.http
      .get<SingleResponse<MuralAviso>>(`${this.gb.servidorURL}${this.base}/${id}`)
      .pipe(map(response => response.data));
  }

  criar(payload: { titulo: string; conteudo: string; destinatario: string; tenant_id?: string | null }): Observable<MuralAviso> {
    return this.http
      .post<SingleResponse<MuralAviso>>(`${this.gb.servidorURL}${this.base}`, payload)
      .pipe(map(response => response.data));
  }

  atualizar(id: string, payload: { titulo: string; conteudo: string; destinatario: string; tenant_id?: string | null }): Observable<MuralAviso> {
    return this.http
      .put<SingleResponse<MuralAviso>>(`${this.gb.servidorURL}${this.base}/${id}`, payload)
      .pipe(map(response => response.data));
  }

  excluir(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.gb.servidorURL}${this.base}/${id}`);
  }
}
