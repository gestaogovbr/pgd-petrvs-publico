import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/services/globals.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, Observable } from 'rxjs';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';


@Injectable()
export class UnidadeService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly auth = inject(AuthService);
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

  isGestorUnidade(unidade: Unidade | string | null = null, incluiDelegado = true, incluiSubstituto = true): boolean {
    const id = unidade == null
      ? (this.auth.unidade?.id ?? null)
      : (typeof unidade === 'string' ? unidade : unidade.id);
    const area = this.auth.unidades?.find(u => u.id === id);
    const gestores = [area?.gestor?.usuario_id];
    if (incluiSubstituto) gestores.push(...(area?.gestores_substitutos?.map(x => x.usuario_id) ?? []));
    if (incluiDelegado) gestores.push(...(area?.gestores_delegados?.map(x => x.usuario_id) ?? []));
    return !!id && !!area && gestores.includes(this.auth.usuario!.id);
  }

  isGestorHierarquia(unidadeId: string): Observable<boolean> {
    return this.http.get<any>(`${this.gb.servidorURL}/${this.base}/${unidadeId}/is-gestor-hierarquia`)
      .pipe(map((r: any) => !!r?.data));
  }
}