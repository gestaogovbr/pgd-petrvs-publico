import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoTrabalhoConsolidacao } from '../models/plano-trabalho-consolidacao.model';
import { Atividade } from '../models/atividade.model';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { Afastamento } from '../models/afastamento.model';
import { PlanoEntrega } from '../models/plano-entrega.model';
import { PlanoTrabalho } from '../models/plano-trabalho.model';
import { Programa } from '../models/programa.model';
import { Comparecimento } from '../models/comparecimento.model';
import { Ocorrencia } from '../models/ocorrencia.model';

export type ConsolidacaoDados = {
  atividades: Atividade[],
  programa: Programa,
  planosEntregas: PlanoEntrega[],
  planoTrabalho: PlanoTrabalho,
  ocorrencias: Ocorrencia[],
  comparecimentos: Comparecimento[],
  entregas: PlanoTrabalhoEntrega[],
  afastamentos: Afastamento[],
  status: string
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

  private loadConsolidacaoDados(response: any): ConsolidacaoDados {
    let dados = response?.dados as ConsolidacaoDados;
    dados.programa = new Programa(this.getRow(dados.programa));
    dados.planoTrabalho = new PlanoTrabalho(this.getRow(dados.planoTrabalho));
    dados.planoTrabalho.entregas = (dados.planoTrabalho.entregas || []).map(x => new PlanoTrabalhoEntrega(this.getRow(x)));
    dados.afastamentos = dados.afastamentos.map(x => new Afastamento(this.getRow(x)));
    dados.atividades = dados.atividades.map(x => new Atividade(Object.assign(this.getRow(x), {plano_trabalho: dados.planoTrabalho})));
    dados.entregas = dados.planoTrabalho.entregas;
    dados.ocorrencias = dados.ocorrencias.map(x => new Ocorrencia(this.getRow(x)));
    dados.comparecimentos = dados.comparecimentos.map(x => new Comparecimento(this.getRow(x)));
    return dados;
  }

  public dadosConsolidacao(id: string): Promise<ConsolidacaoDados> {
    return new Promise<ConsolidacaoDados>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/consolidacao-dados', {id}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          resolve(this.loadConsolidacaoDados(response));
        }
      }, error => reject(error));
    });
  }

  public concluir(id: string, justificativa_conclusao: string | null): Promise<ConsolidacaoDados> {
    return new Promise<ConsolidacaoDados>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/concluir', {id, justificativa_conclusao}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          resolve(this.loadConsolidacaoDados(response));
        }
      }, error => reject(error));
    });
  }

  public cancelarConclusao(id: string): Promise<ConsolidacaoDados> {
    return new Promise<ConsolidacaoDados>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-conclusao', {id}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          resolve(this.loadConsolidacaoDados(response));
        }
      }, error => reject(error));
    });
  }

}

