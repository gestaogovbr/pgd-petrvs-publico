import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioGeracaoDaoService } from 'src/app/dao/relatorio-geracao-dao.service';
import { QueryOptions } from 'src/app/dao/query-options';
import { RelatorioEntregaApiClient } from '../infra/relatorio-entrega-api.client';
import { Page, RelatorioEntregaQueryParams, RelatorioEntregaRow } from '../domain/types';

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
    const filters: Record<string, unknown> = { ...(params.filters ?? {}) };

    const orderBy: any[] = params.orderBy
      ? [[params.orderBy, params.orderDir === 'desc' ? 'desc' : 'asc']]
      : [];

    return { filters, orderBy };
  }
}

@Injectable()
export class ObterUnidadePadraoRelatorioEntrega {
  private readonly api = inject(RelatorioEntregaApiClient);

  execute(): Observable<string | null> {
    return this.api.unidadePadrao();
  }
}
