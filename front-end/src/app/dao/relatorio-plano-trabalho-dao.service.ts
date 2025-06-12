import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { RelatorioPlanoTrabalho } from '../models/relatorio-plano-trabalho.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioPlanoTrabalhoDaoService extends DaoBaseService<RelatorioPlanoTrabalho>{
 
  constructor(protected injector: Injector) { 
    super("Relatorio/planos-trabalho", injector);
  }
}
