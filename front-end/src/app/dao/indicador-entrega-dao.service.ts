import { QueryOptions } from 'src/app/dao/query-options';
import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { IndicadorEntrega } from '../models/indicador-entrega';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadorEntregaDaoService extends DaoBaseService<IndicadorEntrega>{
  constructor(protected injector: Injector) { 
    super("Indicadores/entrega", injector);
  }
}
