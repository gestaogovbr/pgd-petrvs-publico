import { Injectable, Injector } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
import { ProdutoCliente } from "../models/produto-cliente.model";

@Injectable({
  providedIn: 'root'
})

export class ProdutoClienteDaoService extends DaoBaseService<ProdutoCliente> {

  constructor(protected injector: Injector) { 
    super("ProdutoCliente", injector);
  }  
}