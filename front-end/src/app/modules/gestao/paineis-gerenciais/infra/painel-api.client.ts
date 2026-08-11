import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';

export interface DistribuicaoUnidade {
  unidade_id: string;
  unidade_sigla: string;
  valores: number[];
  total: number;
}

export interface Indicador {
  segmentos: string[];
  distribuicoes: DistribuicaoUnidade[];
}

export interface IndicadorTeletrabalho {
  taxa: number;
  limite: number;
  participantes_modalidade: number;
  total_participantes: number;
}

export interface UnidadeInicial {
  unidade_id: string | null;
  unidade_sigla: string | null;
  unidade_nome: string | null;
}

export interface FiltrosPainel {
  tipo_consulta: 'situacao_atual' | 'historico';
  unidade_id: string;
  data_inicio?: string;
  data_fim?: string;
}

export interface SerieAdesaoItem {
  periodo: string;
  executoras?: number;
  nao_executoras?: number;
  participantes?: number;
  nao_participantes?: number;
}

export interface SerieAdesao {
  serie: SerieAdesaoItem[];
}

export interface UnidadeHistorica {
  id: string;
  sigla: string;
  nome: string;
}

@Injectable()
export class PainelApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/painel-gerencial';

  private filtrosToParams(filtros: FiltrosPainel): Record<string, string> {
    const params: Record<string, string> = {
      tipo_consulta: filtros.tipo_consulta,
      unidade_id: filtros.unidade_id,
    };
    if (filtros.data_inicio) params['data_inicio'] = filtros.data_inicio;
    if (filtros.data_fim) params['data_fim'] = filtros.data_fim;
    return params;
  }

  getUnidadeInicial(): Observable<UnidadeInicial> {
    return this.http
      .get<{ data: UnidadeInicial }>(this.resourceUrl('/unidade-inicial'))
      .pipe(map(r => r.data));
  }

  getAlinhamentoInstitucional(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/alinhamento-desempenho/alinhamento-institucional'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getAvaliacoesPlanoEntrega(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/alinhamento-desempenho/avaliacoes-plano-entrega'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getAvaliacoesPlanoTrabalho(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/alinhamento-desempenho/avaliacoes-plano-trabalho'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getTeletrabalhoSubstituicao(filtros: FiltrosPainel): Observable<IndicadorTeletrabalho> {
    return this.http
      .get<{ data: IndicadorTeletrabalho }>(this.resourceUrl('/modalidades/teletrabalho-substituicao'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getTeletrabalhoDiscricionario(filtros: FiltrosPainel): Observable<IndicadorTeletrabalho> {
    return this.http
      .get<{ data: IndicadorTeletrabalho }>(this.resourceUrl('/modalidades/teletrabalho-discricionario'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getModalidadesPorUnidade(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/modalidades/por-unidade'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getConformidadeAvaliacaoPE(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/conformidade/avaliacao-pe'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getConformidadeRegistroExecucaoPE(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/conformidade/registro-execucao-pe'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getConformidadeRegistroExecucaoPT(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/conformidade/registro-execucao-pt'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getConformidadeAvaliacaoPT(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/conformidade/avaliacao-pt'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getConformidadeUnidadesExecutorasPE(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/conformidade/unidades-executoras-pe'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  // Adesão

  getUnidadesExecutoras(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/adesao/unidades-executoras'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getEvolucaoUnidades(filtros: FiltrosPainel): Observable<SerieAdesao> {
    return this.http
      .get<{ data: SerieAdesao }>(this.resourceUrl('/adesao/evolucao-unidades'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getParticipantesPGD(filtros: FiltrosPainel): Observable<Indicador> {
    return this.http
      .get<{ data: Indicador }>(this.resourceUrl('/adesao/participantes-pgd'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getEvolucaoParticipantes(filtros: FiltrosPainel): Observable<SerieAdesao> {
    return this.http
      .get<{ data: SerieAdesao }>(this.resourceUrl('/adesao/evolucao-participantes'), {
        params: this.filtrosToParams(filtros),
      })
      .pipe(map(r => r.data));
  }

  getPeriodosDisponiveis(): Observable<string[]> {
    return this.http
      .get<{ data: string[] }>(this.resourceUrl('/adesao/periodos-disponiveis'))
      .pipe(map(r => r.data));
  }

  getPeriodosDisponiveisPorUnidade(unidadeId: string): Observable<string[]> {
    return this.http
      .get<{ data: string[] }>(this.resourceUrl('/adesao/periodos-disponiveis-por-unidade'), {
        params: { unidade_id: unidadeId },
      })
      .pipe(map(r => r.data));
  }

  getUnidadesHistoricas(): Observable<UnidadeHistorica[]> {
    return this.http
      .get<{ data: UnidadeHistorica[] }>(this.resourceUrl('/adesao/unidades-historicas'))
      .pipe(map(r => r.data));
  }

}
