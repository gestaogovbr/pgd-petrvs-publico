import { Injectable } from '@angular/core';
import { LookupItem } from './lookup.service';
import { AuthService } from './auth.service';
import { CatalogoDaoService } from '../dao/catalogo-dao.service';

@Injectable({
  providedIn: 'root'
})

export class CatalogoService {

  public catalogo: LookupItem[] = [];
  public catalogoDao?: CatalogoDaoService;

  constructor(
    public auth: AuthService
  ) { }

}
