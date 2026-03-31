import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/services/globals.service';
import { map, Observable } from 'rxjs';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';


@Injectable()
export class UnidadeService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = 'api/v2/unidade';


  searchByNomeOuCodigo(term: string): Observable<Unidade[]> {
    return this.http.get<any>(`${this.gb.servidorURL}/${this.base}`, { params: { nome_codigo: term } })  
      .pipe(
        map((response: any) => {
          return (response?.data as Unidade[]) || [];
        }));
  }

  getById(id: string): Observable<Unidade> {
    return this.http
        .get<any>(`${this.gb.servidorURL}/${this.base}/${id}`)
        .pipe(map((response: any) => (response?.data as Unidade)));
  }
}