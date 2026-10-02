import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioGeracaoApiClient } from '../infra/relatorio-geracao-api.client';
import { Page, RelatorioGeracaoQueryParams, RelatorioGeracaoRow } from '../domain/types';

@Injectable()
export class ListarRelatorioGeracao {
  private readonly api = inject(RelatorioGeracaoApiClient);

  execute(params: RelatorioGeracaoQueryParams): Observable<Page<RelatorioGeracaoRow>> {
    return this.api.query(params);
  }
}

@Injectable()
export class ConsultarStatusRelatorioGeracao {
  private readonly api = inject(RelatorioGeracaoApiClient);

  execute(ids: string[]): Observable<RelatorioGeracaoRow[]> {
    return this.api.statusPorIds(ids);
  }
}

@Injectable()
export class BaixarRelatorioGeracao {
  private readonly api = inject(RelatorioGeracaoApiClient);

  execute(id: string): Observable<Blob> {
    return this.api.download(id);
  }
}
