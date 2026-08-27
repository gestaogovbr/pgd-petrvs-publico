import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'src/app/services/globals.service';
import { map, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';

export type UsuarioSearchItem = {
  id: string;
  nome_exibicao: string;
  matricula: string | null;
  cpf?: string | null;
  lotacao?: UnidadeIntegrante;
  modalidade_pgd?: string | null;
  participa_pgd?: string | null;
};

@Injectable({ providedIn: 'root' })
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
            nome_exibicao: String(u?.nome_exibicao ?? u?.nome ?? ''),
            matricula: u?.matricula ? String(u.matricula) : null,
            cpf: u?.cpf ? String(u.cpf) : null,
            lotacao: u?.lotacao ? u.lotacao : null,
            modalidade_pgd: u?.modalidade_pgd ?? null,
            participa_pgd: u?.participa_pgd ?? null,
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

  atualizarNomeSocial(nomeSocial: string | null): Observable<void> {
    return this.http
        .patch<any>(`${this.gb.servidorURL}/${this.base}/nome-social`, { nome_social: nomeSocial })
        .pipe(map(() => void 0));
  }

  criar(dados: {
    cpf: string;
    email: string;
    nome: string;
    perfil_id: string;
    atribuicoes: { unidade_id: string; atribuicoes: string[] }[];
    apelido?: string | null;
    telefone?: string | null;
    data_nascimento?: string | null;
    uf?: string | null;
    sexo?: string | null;
    matricula?: string | null;
  }): Observable<Usuario> {
    return this.http
        .post<any>(`${this.gb.servidorURL}/${this.base}`, dados)
        .pipe(map((response: any) => response?.data as Usuario));
  }

  atualizarDadosPessoais(usuarioId: string, dados: { telefone?: string | null; nome?: string | null; email?: string | null; cpf?: string | null; data_nascimento?: string | null; uf?: string | null }): Observable<Usuario> {
    return this.http
        .patch<any>(`${this.gb.servidorURL}/${this.base}/${usuarioId}/dados-pessoais`, dados)
        .pipe(map((response: any) => response?.data as Usuario));
  }

  atualizarTextoComplementar(usuarioId: string, texto: string | null): Observable<Usuario> {
    return this.http
        .patch<any>(`${this.gb.servidorURL}/${this.base}/${usuarioId}/texto-complementar`, { texto_complementar_plano: texto })
        .pipe(map((response: any) => response?.data as Usuario));
  }

  atualizarPerfil(usuarioId: string, perfilId: string): Observable<Usuario> {
    return this.http
        .patch<any>(`${this.gb.servidorURL}/${this.base}/${usuarioId}/perfil`, { perfil_id: perfilId })
        .pipe(map((response: any) => response?.data as Usuario));
  }

  atualizarAtribuicoes(usuarioId: string, atribuicoes: { unidade_id: string; atribuicoes: string[] }[]): Observable<Usuario> {
    return this.http
        .put<any>(`${this.gb.servidorURL}/${this.base}/${usuarioId}/atribuicoes`, { atribuicoes })
        .pipe(map((response: any) => response?.data as Usuario));
  }
}
