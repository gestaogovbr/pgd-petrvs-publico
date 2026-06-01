import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import { Programa } from 'src/app/models/programa.model';

@Injectable()
export class ProgramaApiService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);

  buscarPorUnidadeExecutora(unidadeId: string, join: string[] = []): Promise<Programa[]> {
    return firstValueFrom(
      this.http
        .post<any>(`${this.gb.servidorURL}/api/Programa/query`, {
          where: [['todosUnidadeExecutora', '==', unidadeId]],
          orderBy: [['unidade.path', 'desc']],
          limit: 0,
          with: join,
          page: 1
        })
        .pipe(
          map((response: any) => {
            if (Array.isArray(response?.rows)) return response.rows as Programa[];
            if (Array.isArray(response?.data)) return response.data as Programa[];
            return [];
          })
        )
    );
  }
}
