import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioPlanoEntregaLacunaApiClient } from '../infra/relatorio-plano-entrega-lacuna-api.client';
import { RelatorioPlanoEntregaLacunaQueryParams, RelatorioPlanoEntregaLacunaRow, Page } from '../domain/types';

@Injectable()
export class ListarRelatorioPlanoEntregaLacuna {
  private readonly api = inject(RelatorioPlanoEntregaLacunaApiClient);

  execute(params: RelatorioPlanoEntregaLacunaQueryParams): Observable<Page<RelatorioPlanoEntregaLacunaRow>> {
    return this.api.query(params);
  }
}

@Injectable()
export class ExportarRelatorioPlanoEntregaLacuna {
  private readonly api = inject(RelatorioPlanoEntregaLacunaApiClient);

  execute(params: RelatorioPlanoEntregaLacunaQueryParams): Observable<Blob> {
    return this.api.exportXls(params);
  }
}
