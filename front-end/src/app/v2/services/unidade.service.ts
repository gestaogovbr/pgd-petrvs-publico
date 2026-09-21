import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { map, Observable } from 'rxjs';
import { Unidade } from 'src/app/models/unidade.model';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import type { Page } from 'src/app/v2/domain/pagination';

@Injectable()
export class UnidadeService extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/unidade';

  private readonly auth = inject(AuthService);

  index(termo: string | null, page: number = 1, size: number = 20): Observable<Page<Unidade>> {
    const params: Record<string, string> = {
      page: String(page),
      size: String(size),
    };
    if (termo) {
      params['filters[termo]'] = termo;
    }

    return this.getCollectionPaged<Unidade>(params, size);
  }

  searchByNomeOuCodigo(term: string): Observable<Unidade[]> {
    return this.index(term, 1, 50).pipe(
      map((page: Page<Unidade>) => page.items)
    );
  }

  getById(id: string): Observable<Unidade> {
    return this.http
        .get<any>(this.resourceUrl(`/${id}`))
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

  isGestorUnidadeSuperior(unidade: Unidade): boolean {
    return this.isGestorUnidade(unidade.unidade_pai_id);
  }

  isGestorHierarquia(unidadeId: string): Observable<boolean> {
    return this.http.get<any>(this.resourceUrl(`/${unidadeId}/is-gestor-hierarquia`))
      .pipe(map((r: any) => !!r?.data));
  }

  /**
   * #2360 RN10/RN12: unidades onde o usuário logado possui atribuição ativa
   * e, opcionalmente, suas subordinadas na cadeia hierárquica.
   */
  minhasUnidades(subordinadas: boolean): Observable<UnidadeResumo[]> {
    return this.http.get<any>(this.resourceUrl('/minhas'), {
      params: { subordinadas: subordinadas ? 'true' : 'false' },
    }).pipe(map((r: any) => (r?.data as UnidadeResumo[]) ?? []));
  }
}

export interface UnidadeResumo {
  id: string;
  sigla: string;
  nome: string;
}
