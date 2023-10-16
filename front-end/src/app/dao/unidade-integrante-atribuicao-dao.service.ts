import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { IntegranteConsolidado } from '../models/unidade-integrante.model';
import { Unidade } from '../models/unidade.model';
import { Usuario } from '../models/usuario.model';
import { UnidadeIntegranteAtribuicao } from '../models/unidade-integrante-atribuicao.model';

export type LoadIntegrantesResult = {
  integrantes: IntegranteConsolidado[],
  unidade?: Unidade,
  usuario?: Usuario
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeIntegranteAtribuicaoDaoService extends DaoBaseService<UnidadeIntegranteAtribuicao> {

  constructor(protected injector: Injector) { 
    super("UnidadeIntegranteAtribuicao", injector);
    this.inputSearchConfig.searchFields = [];
  }  
}

