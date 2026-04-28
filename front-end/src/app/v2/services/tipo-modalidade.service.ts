import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';

export type ModalidadePgdOption = { key: string; value: string };

@Injectable()
export class TipoModalidadeService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);

  listar(): Promise<ModalidadePgdOption[]> {
    return firstValueFrom(
      this.http
        .get<{ data?: ModalidadePgdOption[] }>(`${this.gb.servidorURL}/api/v2/tipo-modalidade`)
        .pipe(
          map((response) => (Array.isArray(response?.data) ? response.data : []))
        )
    );
  }
}
