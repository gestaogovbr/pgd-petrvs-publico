import { Injectable, Injector } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
import { SolucaoUnidade } from "../models/solucao-unidade.model";

@Injectable({
  providedIn: 'root'
})

export class SolucaoUnidadeDaoService extends DaoBaseService<SolucaoUnidade> {

  constructor(protected injector: Injector) { 
    super("SolucaoUnidade", injector);
  }

}