import { Injectable, Injector } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServerService } from '../services/server.service';
import {
  RelatorioCargaIndividualSiape,
  RelatorioCargaIndividualSiapeResponse,
  RelatorioCargaIndividualSiapeTipo
} from '../models/relatorio-carga-individual-siape.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioCargaIndividualSiapeDaoService {
  private server: ServerService;

  constructor(protected injector: Injector) {
    this.server = injector.get<ServerService>(ServerService);
  }

  public async obterPorId(id: string): Promise<RelatorioCargaIndividualSiape | null> {
    const response = await firstValueFrom(
      this.server.post('api/siape/relatorio-carga-individual', { id })
    ) as RelatorioCargaIndividualSiapeResponse;

    return response?.relatorio ?? null;
  }

  public async listarRecentes(tipo?: RelatorioCargaIndividualSiapeTipo | '', chave?: string, limit: number = 20): Promise<RelatorioCargaIndividualSiape[]> {
    const response = await firstValueFrom(
      this.server.post('api/siape/relatorio-carga-individual', { tipo: tipo || undefined, chave: chave || undefined, limit })
    ) as RelatorioCargaIndividualSiapeResponse;

    return response?.relatorios ?? [];
  }
}
