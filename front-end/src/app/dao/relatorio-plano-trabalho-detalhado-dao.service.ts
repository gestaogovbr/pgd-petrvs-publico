import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { RelatorioPlanoTrabalho } from '../models/relatorio-plano-trabalho.model';
import { RelatorioPlanoTrabalhoDaoService } from './relatorio-plano-trabalho-dao.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioPlanoTrabalhoDetalhadoDaoService extends RelatorioPlanoTrabalhoDaoService{
 
  constructor(protected injector: Injector) { 
    super(injector);
    this.collection = "Relatorio/planos-trabalho-detalhado";
  }
}
