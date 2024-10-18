import { Injectable } from '@angular/core';
import { LookupItem } from './lookup.service';
import { AuthService } from './auth.service';
import { SolucaoDaoService } from '../dao/solucao-dao.service';

@Injectable({
  providedIn: 'root'
})

export class SolucaoService {

  public solucao: LookupItem[] = [];
  public solucaoDao?: SolucaoDaoService;

  constructor(
    public auth: AuthService
  ) { }

}
