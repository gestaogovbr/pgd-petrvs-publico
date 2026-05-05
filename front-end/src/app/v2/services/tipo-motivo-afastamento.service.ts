import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import { TipoMotivoAfastamento } from 'src/app/modules/gestao/plano-trabalho-v2/domain/types';

@Injectable({ providedIn: 'root' })
export class TipoMotivoAfastamentoService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);

  listar(): Observable<TipoMotivoAfastamento[]> {
    return this.http.get<any>(`${this.gb.servidorURL}/api/v2/tipos-motivos-afastamentos`, {})
     .pipe(
          map((response) => (Array.isArray(response?.data) ? response.data : []))
        );
  }
}
