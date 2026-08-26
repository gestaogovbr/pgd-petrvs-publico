import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';

export interface PendenciasUsuario {
  assinaturas_pe_pendentes: number;
  assinaturas_pt_pendentes: number;
  registros_execucao_pe_atraso: number;
  registros_execucao_pt_atraso: number;
  avaliacoes_pt_pendentes: number;
  avaliacoes_pe_pendentes: number;
}

export interface IndicadorQuantitativo {
  quantidade: number;
  total: number;
  percentual: number;
}

export interface PlanosVigentes {
  unidades_com_plano_entregas: IndicadorQuantitativo;
  participantes_com_plano_trabalho: IndicadorQuantitativo;
}

export interface MeusPlanosVigentesResponse {
  plano_entregas_id: string | null;
  plano_trabalho_id: string | null;
}

export interface ResumoEquipe {
  participantes_pgd: IndicadorQuantitativo;
  capacidade_equipe_horas_mensais: number;
}

export interface Contribuicoes {
  entregas_propria_unidade_percentual: number;
  entregas_outras_unidades_percentual: number;
  nao_vinculada_entregas_percentual: number;
}

export interface AniversarianteItem {
  nome: string;
}

export interface EmFeriasItem {
  nome: string;
  data_inicio: string;
  data_fim: string;
}

@Injectable()
export class HomeApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/home';

  private params(unidadeId: string, subordinadas: boolean): Record<string, string> {
    return {
      unidade_id: unidadeId,
      subordinadas: subordinadas ? '1' : '0',
    };
  }

  getPendencias(unidadeId: string, subordinadas: boolean): Observable<PendenciasUsuario> {
    return this.http.get<{ data: PendenciasUsuario }>(this.resourceUrl('/pendencias'), { params: this.params(unidadeId, subordinadas) }).pipe(
      map(r => r.data),
    );
  }

  getPendenciasGlobal(): Observable<PendenciasUsuario> {
    return this.http.get<{ data: PendenciasUsuario }>(this.resourceUrl('/pendencias-global')).pipe(
      map(r => r.data),
    );
  }

  getPlanosVigentes(unidadeId: string, subordinadas: boolean): Observable<PlanosVigentes> {
    return this.http.get<{ data: PlanosVigentes }>(this.resourceUrl('/planos-vigentes'), { params: this.params(unidadeId, subordinadas) }).pipe(
      map(r => r.data),
    );
  }

  getResumoEquipe(unidadeId: string, subordinadas: boolean): Observable<ResumoEquipe> {
    return this.http.get<{ data: ResumoEquipe }>(this.resourceUrl('/resumo-equipe'), { params: this.params(unidadeId, subordinadas) }).pipe(
      map(r => r.data),
    );
  }

  getContribuicoes(unidadeId: string, subordinadas: boolean): Observable<Contribuicoes> {
    return this.http.get<{ data: Contribuicoes }>(this.resourceUrl('/contribuicoes'), { params: this.params(unidadeId, subordinadas) }).pipe(
      map(r => r.data),
    );
  }

  getAniversariantes(unidadeId: string, subordinadas: boolean): Observable<{ aniversariantes: AniversarianteItem[] }> {
    return this.http.get<{ data: { aniversariantes: AniversarianteItem[] } }>(this.resourceUrl('/aniversariantes'), { params: this.params(unidadeId, subordinadas) }).pipe(
      map(r => r.data),
    );
  }

  getEmFerias(unidadeId: string, subordinadas: boolean): Observable<{ em_ferias: EmFeriasItem[] }> {
    return this.http.get<{ data: { em_ferias: EmFeriasItem[] } }>(this.resourceUrl('/em-ferias'), { params: this.params(unidadeId, subordinadas) }).pipe(
      map(r => r.data),
    );
  }

  getMeusPlanosVigentes(unidadeId: string): Observable<MeusPlanosVigentesResponse> {
    return this.http.get<{ data: MeusPlanosVigentesResponse }>(this.resourceUrl('/meus-planos-vigentes'), { params: { unidade_id: unidadeId } }).pipe(
      map(r => r.data),
    );
  }
}
