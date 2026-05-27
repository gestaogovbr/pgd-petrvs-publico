import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AvaliacaoConsolidacao, AtividadeConsolidacao, Consolidacao, NotaAvaliacao, Ocorrencia, PlanoTrabalhoId } from '../domain/types';
import { GlobalsService } from 'src/app/services/globals.service';

@Injectable()
export class ConsolidacaoApiClient {
  private readonly gb = inject(GlobalsService);
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v2/plano-trabalho';

  getConsolidacoes(planoId: PlanoTrabalhoId): Observable<Consolidacao[]> {
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao`)
      .pipe(map((r: any) => (r?.data ?? []).map((c: any) => ({
        ...c,
        ocorrencias: (c.afastamentos ?? [])
          .map((pivot: any) => pivot.afastamento)
          .filter(Boolean),
      }))));
  }

  concluirConsolidacao(planoId: string, consolidacaoId: string): Observable<Consolidacao> {
    return this.http.patch<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/concluir`, {})
      .pipe(map((r: any) => r?.data ?? r));
  }

  reabrirConsolidacao(planoId: string, consolidacaoId: string, justificativa: string): Observable<Consolidacao> {
    return this.http.patch<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/reabrir`, { justificativa })
      .pipe(map((r: any) => r?.data ?? r));
  }

  avaliarConsolidacao(planoId: string, consolidacaoId: string, payload: { tipo_avaliacao_nota_id: string; justificativa?: string }): Observable<AvaliacaoConsolidacao> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/avaliacao`, payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  cancelarAvaliacao(planoId: string, consolidacaoId: string, avaliacaoId: string): Observable<Consolidacao> {
    return this.http.delete<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/avaliacao/${avaliacaoId}`)
      .pipe(map((r: any) => r?.data ?? r));
  }

  solicitarRecurso(planoId: string, consolidacaoId: string, justificativa: string): Observable<AvaliacaoConsolidacao> {
    return this.http.patch<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/recurso`, { justificativa })
      .pipe(map((r: any) => r?.data ?? r));
  }

  getNotasConsolidacao(planoId: string): Observable<NotaAvaliacao[]> {
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/notas-avaliacao`)
      .pipe(map((r: any) => r?.data ?? []));
  }

  createAtividade(planoId: string, consolidacaoId: string, payload: { plano_trabalho_entrega_id: string; descricao: string }): Observable<AtividadeConsolidacao> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/atividade`, payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  updateAtividade(planoId: string, consolidacaoId: string, atividadeId: string, payload: { descricao: string }): Observable<AtividadeConsolidacao> {
    return this.http.put<any>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/atividade/${atividadeId}`, payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  deleteAtividade(planoId: string, consolidacaoId: string, atividadeId: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${planoId}/consolidacao/${consolidacaoId}/atividade/${atividadeId}`);
  }

  // --- Ocorrências ---

  createOcorrencia(planoId: string, payload: {
    observacoes: string;
    data_inicio: string;
    data_fim: string;
    tipo_motivo_afastamento_id: string;
    horas?: number;
  }): Observable<Ocorrencia> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoId}/ocorrencia`, payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  updateOcorrencia(planoId: string, ocorrenciaId: string, payload: {
    observacoes?: string;
    tipo_motivo_afastamento_id?: string;
    horas?: number | null;
  }): Observable<Ocorrencia> {
    return this.http.patch<any>(`${this.gb.servidorURL}${this.base}/${planoId}/ocorrencia/${ocorrenciaId}`, payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  deleteOcorrencia(planoId: string, ocorrenciaId: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${planoId}/ocorrencia/${ocorrenciaId}`);
  }
}
