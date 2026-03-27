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

    return firstValueFrom(
      this.http
        .get<any>(`${this.gb.servidorURL}/api/v2/TipoModalidade/query`, {
          params: {
            exige_pedagio: pedagio ? 0 : 1
          }
        })
        .pipe(
          map((response: any) => {
            const items = Array.isArray(response?.data) ? response.data : [];
            return items as TipoModalidade[];
          })
        )
    );
  }
}
