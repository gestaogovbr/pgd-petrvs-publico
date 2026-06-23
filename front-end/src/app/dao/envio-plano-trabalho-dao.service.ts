import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoTrabalho } from '../models/plano-trabalho.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioPlanoTrabalhoDaoService extends DaoBaseService<PlanoTrabalho> {
  constructor(protected injector: Injector) {
    super('EnvioPlanoTrabalho', injector);
  }
}
