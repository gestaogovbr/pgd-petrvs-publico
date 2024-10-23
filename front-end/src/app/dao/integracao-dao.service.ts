import { Injectable, Injector } from '@angular/core';
import { Integracao } from '../models/integracao.model';
import { LookupItem } from '../services/lookup.service';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class IntegracaoDaoService extends DaoBaseService<Integracao> {

  constructor(protected injector: Injector) {
    super("Integracao", injector);
    this.inputSearchConfig.searchFields = ["usuario_id", "data_execucao", "atualizar_unidades", "atualizar_servidores", "atualizar_gestores"];
  }

  public showResponsaveis(): Promise<LookupItem[]> {
    return new Promise<LookupItem[]>((resolve, reject) => {
      this.server.post('api/Integracao/showResponsaveis', []).subscribe(response => {
        resolve(response.responsaveis);
      }, error => {
        console.log("Erro ao buscar a lista dos responsáveis pela execução da Rotina de Integração!", error);
        resolve([]);
      });
    });
  }

  public buscaProcessamentosPendentes() {
    return new Promise<any>((resolve, reject) => {
      this.server.get('api/Integracao/busca-processamentos-pendentes').subscribe(response => {
        resolve(response);
      }, error => {
        console.log("Erro ao buscar os processamentos pendentes!", error);
        resolve([]);
      });
    });
  }
}
