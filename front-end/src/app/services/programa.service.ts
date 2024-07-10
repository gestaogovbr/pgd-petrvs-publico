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
    console.log(programa?.data_fim);
    console.log(new Date());
    
    return programa ? (programa.data_fim >= new Date()) : true;
  }

}
