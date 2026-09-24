import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ImpactoConsolidacoes, Ocorrencia, TipoMotivoAfastamento } from '../domain/types';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import type { Page } from 'src/app/v2/domain/pagination';

export interface AgenteOption {
  id: string;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class OcorrenciaApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/ocorrencia';

  listar(params: Record<string, any> = {}): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<any>(this.resourceUrl(), { params: httpParams })
      .pipe(map(r => r?.data));
  }

  agentes(termo: string | null, page = 1, size = 20): Observable<Page<AgenteOption>> {
    const params: Record<string, string> = {
      page: String(page),
      size: String(size),
    };
    if (termo) {
      params['filters[termo]'] = termo;
    }
    return this.http.get<unknown>(this.resourceUrl('/agentes'), { params })
      .pipe(map(response => TenantV2ResourceApiBase.mapLaravelWrappedPage<AgenteOption>(response, size)));
  }

  criar(payload: any): Observable<Ocorrencia> {
    return this.http.post<any>(this.resourceUrl(), payload)
      .pipe(map(r => r?.data));
  }

  excluir(id: string, usuarioId: string): Observable<void> {
    return this.http.delete<void>(this.resourceUrl(`/${id}`), {
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
    operacao: 'criar' | 'excluir';
    ocorrencia_id?: string;
    tipo_motivo_afastamento_id?: string;
  }): Observable<ImpactoConsolidacoes> {
    const clean = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined));
    const httpParams = new HttpParams({ fromObject: clean });
    return this.http.get<any>(this.resourceUrl('/impacto-consolidacoes'), { params: httpParams })
      .pipe(map(r => r?.data));
  }
}
