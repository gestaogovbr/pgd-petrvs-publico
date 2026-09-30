import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioGeracaoDaoService } from 'src/app/dao/relatorio-geracao-dao.service';
import { QueryOptions } from 'src/app/dao/query-options';
import { RelatorioEntregaApiClient } from '../infra/relatorio-entrega-api.client';
import { Page, RelatorioEntregaListFilters, RelatorioEntregaQueryParams, RelatorioEntregaRow } from '../domain/types';

@Injectable()
export class ListarRelatorioEntrega {
  private readonly api = inject(RelatorioEntregaApiClient);

  execute(params: RelatorioEntregaQueryParams): Observable<Page<RelatorioEntregaRow>> {
    return this.api.query(params);
  }
}

@Injectable()
export class ExportarRelatorioEntrega {
  private readonly relatorioGeracaoDao = inject(RelatorioGeracaoDaoService);

  execute(params: RelatorioEntregaQueryParams): Observable<unknown> {
    return this.relatorioGeracaoDao.solicitar('entrega', this.toQueryOptions(params));
  }

  private toQueryOptions(params: RelatorioEntregaQueryParams): QueryOptions {
    const filters: RelatorioEntregaListFilters = params.filters ?? {};
    const where: any[] = [];

    if (filters.unidade_id) {
      where.push(['unidade_id', '==', filters.unidade_id]);
    }
    if (filters.incluir_unidades_subordinadas) {
      where.push(['incluir_unidades_subordinadas', '==', 1]);
    }
    if (filters.periodo_inicio) {
      where.push(['periodo_inicio', '==', filters.periodo_inicio]);
    }
    if (filters.periodo_fim) {
      where.push(['periodo_fim', '==', filters.periodo_fim]);
    }

    const orderBy: any[] = params.orderBy
      ? [[params.orderBy, params.orderDir === 'desc' ? 'desc' : 'asc']]
      : [];

    return { where, orderBy };
  }
}

@Injectable()
export class ObterUnidadePadraoRelatorioEntrega {
  private readonly api = inject(RelatorioEntregaApiClient);

  execute(): Observable<string | null> {
    return this.api.unidadePadrao();
  }
}
