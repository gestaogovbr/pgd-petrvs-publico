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

  public ativarTodos(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/ativar-todos', {}).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public desativarTodos(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/desativar-todos', {}).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
}