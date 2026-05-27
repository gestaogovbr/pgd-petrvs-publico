import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/services/globals.service';
import { map, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';

export type UsuarioSearchItem = {
  id: string;
  nome: string;
  matricula: string | null;
  cpf?: string | null;
  lotacao?: UnidadeIntegrante;
  modalidade_pgd?: string | null;
};

@Injectable()
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = 'api/v2/usuario';

  searchByNomeMatricula(term: string): Observable<UsuarioSearchItem[]> {
    return this.http
      .get<any>(`${this.gb.servidorURL}/${this.base}`, { params: { nome_matricula: term } })
      .pipe(
        map((response: any) => {
          const items = Array.isArray(response?.data) ? response.data : [];
          return items.map((u: any) => ({
            id: String(u?.id ?? ''),
            nome: String(u?.nome ?? ''),
            matricula: u?.matricula ? String(u.matricula) : null,
            cpf: u?.cpf ? String(u.cpf) : null,
            lotacao: u?.lotacao ? u.lotacao : null,
            modalidade_pgd: u?.modalidade_pgd ?? null,
          }));
        })
      );
  }

  getById(id: string): Observable<Usuario> {
    return this.http
        .get<any>(`${this.gb.servidorURL}/${this.base}/${id}`)
        .pipe(map((response: any) => (response?.data as Usuario)));
  }

  getUnidadesVinculadas(cpf: string): Observable<Unidade[]> {
    return this.http
        .get<any>(`${this.gb.servidorURL}/${this.base}/cpf/${cpf}/unidades`)
        .pipe(map((response: any) => (response?.data as Unidade[])));
  }
}
