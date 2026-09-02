import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private readonly api = inject(RelatorioEntregaApiClient);

  execute(params: RelatorioEntregaQueryParams): Observable<Blob> {
    return this.api.exportXls(params);
  }
}

@Injectable()
export class ObterUnidadePadraoRelatorioEntrega {
  private readonly api = inject(RelatorioEntregaApiClient);

  execute(): Observable<string | null> {
    return this.api.unidadePadrao();
  }
}
