import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';

@Injectable()
export class DocumentoApiClient {
  private readonly gb = inject(GlobalsService);
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v2/plano-trabalho';

  getDocumento(planoTrabalhoId: string): Observable<any> {
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento`)
      .pipe(map((r: any) => r?.data ?? r));
  }

  createDocumento(planoTrabalhoId: string, justificativa?: string): Observable<any> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento`, { justificativa })
      .pipe(map((r: any) => r?.data ?? r));
  }

  assinarDocumento(planoTrabalhoId: string): Observable<any> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento/assinatura-tcr`, {})
      .pipe(map((r: any) => r?.data ?? r));
  }

  cancelarAssinaturaDocumento(planoTrabalhoId: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento/assinatura-tcr`);
  }
}
