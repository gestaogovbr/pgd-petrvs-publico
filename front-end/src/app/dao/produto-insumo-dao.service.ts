import { Injectable, Injector } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
import { ProdutoInsumo } from "../models/produto-insumo.model";

@Injectable({
  providedIn: 'root'
})

export class ProdutoInsumoDaoService extends DaoBaseService<ProdutoInsumo> {

  constructor(protected injector: Injector) { 
    super("ProdutoInsumo", injector);
  }  
}