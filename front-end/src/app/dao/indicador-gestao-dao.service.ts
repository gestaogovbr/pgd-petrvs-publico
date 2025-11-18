import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Observable } from 'rxjs';
import { IndicadorGestao } from '../models/indicador-gestao';

@Injectable({
  providedIn: 'root'
})
export class IndicadorGestaoDaoService extends DaoBaseService<IndicadorGestao>{
 
  constructor(protected injector: Injector) { 
    super("Indicadores/gestao", injector);
  }
}
