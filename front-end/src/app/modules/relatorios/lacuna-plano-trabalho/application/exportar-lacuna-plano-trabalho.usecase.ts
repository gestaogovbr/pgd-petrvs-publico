import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioGeracaoDaoService } from 'src/app/dao/relatorio-geracao-dao.service';
import { QueryOptions } from 'src/app/dao/query-options';
import { LacunaPlanoTrabalhoQueryParams } from '../domain/types';

@Injectable()
export class ExportarLacunaPlanoTrabalho {
  private readonly relatorioGeracaoDao = inject(RelatorioGeracaoDaoService);

  execute(params: LacunaPlanoTrabalhoQueryParams): Observable<unknown> {
    return this.relatorioGeracaoDao.solicitar('lacuna_plano_trabalho', this.toQueryOptions(params));
  }

  private toQueryOptions(params: LacunaPlanoTrabalhoQueryParams): QueryOptions {
    return {
      filters: { ...(params.filters ?? {}) },
      orderBy: [],
    };
  }
}
