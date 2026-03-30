import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';

@Injectable()
export class TipoModalidadeService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);

  listar(pedagio: boolean): Promise<TipoModalidade[]> {
    const params: Record<string, string> = {};
    if (pedagio) {
      params.exige_pedagio = '0';
    }
    return firstValueFrom(
      this.http
        .get<{ data?: TipoModalidade[] }>(`${this.gb.servidorURL}/api/v2/tipo-modalidade`, {
          params
        })
        .pipe(
          map((response) => (Array.isArray(response?.data) ? response.data : []))
        )
    );
  }
}
