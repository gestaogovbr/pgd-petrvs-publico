import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import { ImpactoConsolidacoes, Ocorrencia, TipoMotivoAfastamento } from '../domain/types';

@Injectable({ providedIn: 'root' })
export class OcorrenciaApiClient {
  private readonly gb = inject(GlobalsService);
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v2/ocorrencia';

  listar(params: Record<string, any> = {}): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}`, { params: httpParams })
      .pipe(map(r => r?.data));
  }

  agentes(): Observable<{ id: string; nome: string }[]> {
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}/agentes`)
      .pipe(map(r => r?.data ?? []));
  }

  criar(payload: any): Observable<Ocorrencia> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}`, payload)
      .pipe(map(r => r?.data));
  }

  atualizar(id: string, payload: any): Observable<Ocorrencia> {
    return this.http.put<any>(`${this.gb.servidorURL}${this.base}/${id}`, payload)
      .pipe(map(r => r?.data));
  }

  excluir(id: string, usuarioId: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${id}`, {
      body: { usuario_id: usuarioId },
    });
  }

  tipos(): Observable<TipoMotivoAfastamento[]> {
    return this.http.get<any>(`${this.gb.servidorURL}/api/v2/tipos-motivos-afastamentos`)
      .pipe(map(r => r?.data ?? []));
  }

  impactoConsolidacoes(params: {
    usuario_id: string;
    data_inicio: string;
    data_fim: string;
    operacao: 'criar' | 'editar' | 'excluir';
    ocorrencia_id?: string;
  }): Observable<ImpactoConsolidacoes> {
    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}/impacto-consolidacoes`, { params: httpParams })
      .pipe(map(r => r?.data));
  }
}
