import { Injectable, Injector } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
import { ProdutoProduto } from "../models/produto-produto.model";

@Injectable({
  providedIn: 'root'
})

export class ProdutoProdutoDaoService extends DaoBaseService<ProdutoProduto> {

  constructor(protected injector: Injector) { 
    super("ProdutoProduto", injector);
  }  
}