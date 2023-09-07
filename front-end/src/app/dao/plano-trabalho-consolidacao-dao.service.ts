import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoTrabalhoConsolidacao } from '../models/plano-trabalho-consolidacao.model';
import { Atividade } from '../models/atividade.model';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { Afastamento } from '../models/afastamento.model';
import { PlanoTrabalhoConsolidacaoOcorrencia } from '../models/plano-trabalho-consolidacao-ocorrencia.model';
import { PlanoEntrega } from '../models/plano-entrega.model';
import { PlanoTrabalho } from '../models/plano-trabalho.model';

export type ConsolidacaoDados = {
  atividades: Atividade[],
  planosEntregas: PlanoEntrega[],
  planoTrabalho: PlanoTrabalho,
  ocorrencias: PlanoTrabalhoConsolidacaoOcorrencia[],
  entregas: PlanoTrabalhoEntrega[],
  afastamentos: Afastamento[]
}

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoConsolidacaoDaoService extends DaoBaseService<PlanoTrabalhoConsolidacao> {

  constructor(protected injector: Injector) {
    super("PlanoTrabalhoConsolidacao", injector);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([], deeps);
  }

  public dadosConsolidacao(id: string): Promise<ConsolidacaoDados> {
    return new Promise<ConsolidacaoDados>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/consolidacao-dados', {id}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          let dados = response?.dados as ConsolidacaoDados;
          dados.planoTrabalho = new PlanoTrabalho(this.getRow(dados.planoTrabalho));
          dados.planoTrabalho.entregas = (dados.planoTrabalho.entregas || []).map(x => new PlanoTrabalhoEntrega(this.getRow(x)));
          dados.afastamentos = dados.afastamentos.map(x => new Afastamento(this.getRow(x)));
          dados.atividades = dados.atividades.map(x => new Atividade(Object.assign(this.getRow(x), {plano_trabalho: dados.planoTrabalho})));
          dados.entregas = dados.planoTrabalho.entregas;
          dados.ocorrencias = dados.ocorrencias.map(x => new PlanoTrabalhoConsolidacaoOcorrencia(this.getRow(x)));
          resolve(dados);
        }
      }, error => reject(error));
    });
  }


}

