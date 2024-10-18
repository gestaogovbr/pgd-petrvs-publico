import { Injectable } from '@angular/core';
import { LookupItem } from './lookup.service';
import { AuthService } from './auth.service';
import { ProdutoDaoService } from '../dao/produto-dao.service';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  public produto: LookupItem[] = [];
  public produtoDao?: ProdutoDaoService;

  constructor(
    public auth: AuthService
  ) { }

}
