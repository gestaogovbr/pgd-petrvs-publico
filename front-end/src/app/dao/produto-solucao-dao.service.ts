import { Injectable, Injector } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
import { ProdutoSolucao } from "../models/produto-solucao.model";

@Injectable({
  providedIn: 'root'
})

export class ProdutoSolucaoDaoService extends DaoBaseService<ProdutoSolucao> {

  constructor(protected injector: Injector) { 
    super("ProdutoSolucao", injector);
  }  
}