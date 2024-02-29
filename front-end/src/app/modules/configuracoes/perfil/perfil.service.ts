import { Injectable } from '@angular/core';
import { TipoCapacidade } from 'src/app/models/tipo-capacidade.model';
import { LookupService } from 'src/app/services/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(public lookup: LookupService) { }

  public ordenarTiposCapacidade(tipos: TipoCapacidade[]): TipoCapacidade[]{
    return tipos.sort((a,b) => {
        const codigoA = a.codigo.toUpperCase();
        const codigoB = b.codigo.toUpperCase();
        return codigoA < codigoB ? -1 : 1;
    })
  }
}
