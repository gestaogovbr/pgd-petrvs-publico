import { Injectable, Injector } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
import { ProdutoProcesso } from "../models/produto-processo.model";

@Injectable({
  providedIn: 'root'
})

export class ProdutoProcessoDaoService extends DaoBaseService<ProdutoProcesso> {

  constructor(protected injector: Injector) { 
    super("ProdutoProcesso", injector);
  }  
}