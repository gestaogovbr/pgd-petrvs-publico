import { Injectable } from '@angular/core';
import { ProgramaDaoService } from '../dao/programa-dao.service';
import { LookupItem } from './lookup.service';
import { Programa } from '../models/programa.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProgramaService {

  public programa: LookupItem[] = [];
  public programaDao?: ProgramaDaoService;

  constructor(
    public auth: AuthService
  ) { }

  public programaVigente(programa: Programa | undefined): boolean {
    if (!programa) return true;
    const hoje = new Date();
    const inicio = new Date(programa.data_inicio);
    const fim = new Date(programa.data_fim);
    return inicio <= hoje && fim >= hoje;
  }

  public selecionaProgramaVigente(programas: Programa[]): Programa | undefined {
    return programas.find((prog: Programa) => this.programaVigente(prog));
  }

}
