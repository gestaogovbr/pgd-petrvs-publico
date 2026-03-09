import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanejamentoObjetivo } from '../models/planejamento-objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoObjetivoDaoService extends DaoBaseService<PlanejamentoObjetivo> {

  constructor(protected injector: Injector) {
    super("PlanejamentoObjetivo", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }

  public ordenar(objetivos: PlanejamentoObjetivo[]): Promise<PlanejamentoObjetivo[]> {
    return new Promise<PlanejamentoObjetivo[]>((resolve, reject) => {
      this.server.post('api/PlanejamentoObjetivo/ordenar', { objetivos: objetivos }).subscribe(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      });
    });
  }

}

