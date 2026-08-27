import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';

export type CadeiaValorProcessoNodeApi = {
  processo_id: string;
  nome: string;
  sequencia: number;
  processo_pai_id: string | null;
  cadeia_valor_id: string;
  cadeia_valor_nome: string;
  nivel: number;
  total_vinculos: number;
  etiquetas: string[] | null;
  filhos_ids: string[];
  vinculos_cross_cadeia: VinculoCrossCadeiaApi[];
};

export type VinculoCrossCadeiaApi = {
  processo_id: string;
  processo_nome: string;
  cadeia_valor_id: string;
  cadeia_valor_nome: string;
};

export type CadeiaValorArvoreApi = {
  processo_focal_id: string;
  cadeia_valor_id: string;
  cadeia_valor_nome: string;
  nos: Record<string, CadeiaValorProcessoNodeApi>;
  ancestrais_ids: string[];
  raiz_ids: string[];
  nivel_maximo: number;
};

export type FiltroOpcaoApi = {
  id: string;
  label: string;
};

export type CadeiaValorResumoEsforcoApi = {
  disponivel_horas: number;
  planejado_horas: number;
  executado_horas: number;
  planejado_percentual_disponivel: number;
  executado_percentual_planejado: number;
  mostrar_disponivel: boolean;
  mostrar_planejado: boolean;
  mostrar_executado: boolean;
};

export type CadeiaValorResumoPessoasApi = {
  total_participantes: number;
  participantes_somente_unidade_propria: number;
  participantes_somente_outras_unidades: number;
  participantes_em_ambas: number;
};

export type CadeiaValorResumoEntregasApi = {
  total_entregas: number;
  entregas_concluidas: number;
  percentual_concluidas: number;
};

export type CadeiaValorResumoApi = {
  processo_id: string;
  processo_nome: string;
  nivel: number;
  esforco: CadeiaValorResumoEsforcoApi;
  pessoas: CadeiaValorResumoPessoasApi;
  entregas: CadeiaValorResumoEntregasApi;
  filtro_unidades: FiltroOpcaoApi[];
};

export type CadeiaValorPainelEntregaDetalheLinhaApi = {
  plano_entrega_entrega_id: string;
  unidade_id: string;
  unidade_sigla: string;
  unidade_nome: string;
  plano_entrega_id: string;
  plano_entrega_nome: string;
  plano_entrega_status: string;
  plano_entrega_vigencia_inicio: string;
  plano_entrega_vigencia_fim: string;
  entrega_titulo: string;
  progresso_esperado: number;
  progresso_realizado: number;
  meta: Record<string, unknown> | null;
  realizado: Record<string, unknown> | null;
  tipo_indicador: string | null;
  lista_qualitativos: Array<{ key: string; value: string }> | null;
  registro_execucao: string | null;
  participantes_total: number;
  participantes_somente_unidade_propria: number;
  participantes_somente_outras_unidades: number;
  participantes_em_ambas: number;
  esforco_disponivel_horas: number;
  esforco_planejado_horas: number;
  esforco_executado_horas: number;
  mostrar_disponivel: boolean;
  mostrar_planejado: boolean;
  mostrar_executado: boolean;
};

export type CadeiaValorPainelEntregasDetalhamentoApi = {
  processo_id: string;
  itens: CadeiaValorPainelEntregaDetalheLinhaApi[];
  filtro_entregas: FiltroOpcaoApi[];
  filtro_unidades: FiltroOpcaoApi[];
};

type ApiResponse<T> = { success?: boolean; data?: T; error?: string };

@Injectable()
export class CadeiaValorArvoreApiClient {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = '/api/v2/cadeia-valor';

  getArvore(cadeiaValorId: string, processoId: string): Observable<CadeiaValorArvoreApi> {
    const url = `${this.gb.servidorURL}${this.base}/${cadeiaValorId}/arvore/${processoId}`;
    return this.http.get<ApiResponse<CadeiaValorArvoreApi>>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) throw new Error(res.error);
        if (!res?.data) throw new Error('Resposta inválida do servidor.');
        return res.data;
      })
    );
  }

  getResumo(cadeiaValorId: string, processoId: string, params?: { unidade_id?: string }): Observable<CadeiaValorResumoApi> {
    const url = `${this.gb.servidorURL}${this.base}/${cadeiaValorId}/processo/${processoId}/resumo`;
    const httpParams: Record<string, string> = {};
    if (params?.unidade_id) {
      httpParams['unidade_id'] = params.unidade_id;
    }
    return this.http.get<ApiResponse<CadeiaValorResumoApi>>(url, { withCredentials: true, params: httpParams }).pipe(
      map(res => {
        if (res?.error) throw new Error(res.error);
        if (!res?.data) throw new Error('Resposta inválida do servidor.');
        return res.data;
      })
    );
  }

  getEntregasDetalhamento(cadeiaValorId: string, processoId: string, params?: Record<string, string>): Observable<CadeiaValorPainelEntregasDetalhamentoApi> {
    const url = `${this.gb.servidorURL}${this.base}/${cadeiaValorId}/processo/${processoId}/entregas-detalhamento`;
    return this.http.get<ApiResponse<CadeiaValorPainelEntregasDetalhamentoApi>>(url, { withCredentials: true, params }).pipe(
      map(res => {
        if (res?.error) throw new Error(res.error);
        if (!res?.data) throw new Error('Resposta inválida do servidor.');
        return res.data;
      })
    );
  }
}
