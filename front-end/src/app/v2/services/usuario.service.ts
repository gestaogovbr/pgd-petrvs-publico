import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/services/globals.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

export type UsuarioSearchItem = {
  id: string;
  nome: string;
  matricula: string | null;
};

@Injectable()
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);

  searchByNomeMatricula(term: string): Observable<UsuarioSearchItem[]> {
    return this.http
      .get<any>(`${this.gb.servidorURL}/api/v2/usuario`, { params: { nome_matricula: term } })
      .pipe(
        map((response: any) => {
          const items = Array.isArray(response?.data) ? response.data : [];
          return items.map((u: any) => ({
            id: String(u?.id ?? ''),
            nome: String(u?.nome ?? ''),
            matricula: u?.matricula ? String(u.matricula) : null
          }));
        })
      );
  }

  getById(id: string, withRelations: string[]): Promise<Usuario | null> {
    return firstValueFrom(
      this.http
        .post<any>(`${this.gb.servidorURL}/api/Usuario/get-by-id`, { id, with: withRelations })
        .pipe(map((response: any) => (response?.data as Usuario) ?? null))
    );
  }
}
