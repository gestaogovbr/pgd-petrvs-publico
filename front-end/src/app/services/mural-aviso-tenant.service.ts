import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { GlobalsService } from './globals.service';
import { MuralAvisoPendente } from '../v2/domain/mural-aviso.types';

@Injectable({ providedIn: 'root' })
export class MuralAvisoTenantService {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = '/api/v2/mural-aviso';

  getPendentes(): Promise<MuralAvisoPendente[]> {
    return firstValueFrom(
      this.http
        .get<{ success: boolean; data: MuralAvisoPendente[] }>(`${this.gb.servidorURL}${this.base}/pendentes`)
        .pipe(map(response => response?.data || []))
    ).catch(() => []);
  }

  confirmarLeitura(): Promise<void> {
    return firstValueFrom(
      this.http
        .post<{ success: boolean }>(`${this.gb.servidorURL}${this.base}/confirmar`, {})
        .pipe(map(() => undefined))
    );
  }
}
