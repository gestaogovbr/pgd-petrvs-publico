import { Injectable, Injector } from '@angular/core';
import { Atividade } from '../models/atividade.model';
import { UtilService } from '../services/util.service';
import { DaoBaseService } from './dao-base.service';
import { AtividadeHierarquia } from '../models/atividade-hierarquia.model';
import { Planejamento } from '../models/planejamento.model';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { PlanoEntregaEntrega } from '../models/plano-entrega-entrega.model';
import { PlanejamentoObjetivo } from '../models/planejamento-objetivo.model';
import { CadeiaValorProcesso } from '../models/cadeia-valor-processo.model';
import { CadeiaValor } from '../models/cadeia-valor.model';

@Injectable({
  providedIn: 'root'
})
export class AtividadeDaoService extends DaoBaseService<Atividade> {

  constructor(protected injector: Injector) {
    super("Atividade", injector);
    this.inputSearchConfig.searchFields = ["numero", "descricao"];
  }

  public prazo(inicio_data: Date, horas: number, carga_horaria: number, unidade_id: string): Promise<Date> {
    return new Promise<Date>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/prazo', {
        inicio_data: UtilService.dateToIso8601(inicio_data),
        horas: horas,
        carga_horaria: carga_horaria,
        unidade_id: unidade_id
      }).subscribe(response => {
        resolve(UtilService.iso8601ToDate(response?.date));
      }, error => reject(error));
    });
  }

  public getAtividade(id: string): Promise<Atividade | null> {
    return this.getById(id, ["pausas", "unidade", "tipo_atividade", "comentarios.usuario", "plano_trabalho.entregas.entrega:id,nome", "plano_trabalho.tipo_modalidade", "plano_trabalho.documento:id,metadados", "usuario", "usuario.afastamentos", "usuario.planos_trabalho.tipo_modalidade", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario"]); 
  }

  public getHierarquia(atividade_id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/hierarquia', {
        atividade_id: atividade_id
      }).subscribe(response => {
        resolve(this.loadHierarquiaDados(response));
      }, error => {
        console.log("Erro ao montar a hierarquia da atividade!", error);
        resolve([]);
      });
    });
  }

  private loadHierarquiaDados(response: any): AtividadeHierarquia {
    let dados = response?.hierarquia as AtividadeHierarquia;
    dados.planejamento = new Planejamento(this.getRow(dados.planejamento));
    dados.cadeiaValor = new CadeiaValor(this.getRow(dados.cadeiaValor));
    dados.entregaPlanoTrabalho = new PlanoTrabalhoEntrega(this.getRow(dados.entregaPlanoTrabalho));
    dados.entregasPlanoEntrega = dados.entregasPlanoEntrega?.map(x =>new PlanoEntregaEntrega(Object.assign(this.getRow(x)))).reverse();
    dados.objetivos = dados.objetivos?.map(x =>new PlanejamentoObjetivo(Object.assign(this.getRow(x)))).reverse();
    dados.processos = dados.processos?.map(x =>new CadeiaValorProcesso(Object.assign(this.getRow(x))));
    dados.atividade =  new Atividade(this.getRow(dados.atividade));
    return dados;
  }

  public iniciadas(usuario_id: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/iniciadas', {
        usuario_id: usuario_id
      }).subscribe(response => {
        resolve(response?.iniciadas || []);
      }, error => reject(error));
    });
  }

  public iniciar(atividade: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/iniciar', this.prepareToSave(atividade)).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public concluir(atividade: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/concluir', this.prepareToSave(atividade)).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public pausar(pausa: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/pausar', this.prepareToSave(pausa)).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public reiniciar(pausa: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/reiniciar', this.prepareToSave(pausa)).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public cancelarInicio(atividade_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-inicio', {id: atividade_id}).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public cancelarConclusao(atividade_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-conclusao', {id: atividade_id}).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public prorrogar(prorrogar: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/prorrogar', this.prepareToSave(prorrogar)).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

  public arquivar(atividade_id: string, arquivar: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/arquivar', {id: atividade_id, arquivar: arquivar}).subscribe(response => {
        if(response.error){
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }        
      }, error => reject(error));
    });
  }

}

