import { Injectable, Injector } from "@angular/core";
import { Produto } from "../models/produto.model";
import { DaoBaseService } from "./dao-base.service";

@Injectable({
  providedIn: 'root'
})

export class ProdutoDaoService extends DaoBaseService<Produto> {

  constructor(protected injector: Injector) { 
    super("Produto", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}