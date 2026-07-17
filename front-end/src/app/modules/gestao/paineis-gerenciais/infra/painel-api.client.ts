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

  /** Converte filtros de mês/ano para FiltrosPainel (data_inicio = jan do ano, data_fim = último dia do mês) */
  buildFiltrosFromMesAno(unidadeId: string, mes: number, ano: number): FiltrosPainel {
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth() + 1;
    const isSituacaoAtual = ano === anoAtual && mes === mesAtual;

    const dataFim = new Date(ano, mes, 0); // último dia do mês
    return {
      tipo_consulta: isSituacaoAtual ? 'situacao_atual' : 'historico',
      unidade_id: unidadeId,
      data_inicio: `${ano}-01-01`,
      data_fim: dataFim.toISOString().split('T')[0],
    };
  }

  getPeriodosDisponiveis(): Observable<string[]> {
    return this.http
      .get<{ data: string[] }>(this.resourceUrl('/adesao/periodos-disponiveis'))
      .pipe(map(r => r.data));
  }
}
