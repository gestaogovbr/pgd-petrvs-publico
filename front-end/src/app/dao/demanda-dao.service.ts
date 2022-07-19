import { Injectable, Injector } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { UtilService } from '../services/util.service';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class DemandaDaoService extends DaoBaseService<Demanda> {

  constructor(protected injector: Injector) {
    super("Demanda", injector);
    this.searchFields = ["numero", "assunto"];
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

  public getDemanda(id: string): Promise<Demanda | null> {
    return this.getById(id, ["pausas", "unidade", "atividade", "comentarios.usuario", "plano.tipo_modalidade", "plano.documento:id,metadados", "avaliacao", "avaliacoes", "usuario", "usuario.afastamentos", "usuario.planos.tipo_modalidade", "entregas.tarefa", "entregas.comentarios.usuario"]); 
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

  public avaliadas(usuario_id: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/avaliadas', {
        usuario_id: usuario_id
      }).subscribe(response => {
        resolve(response?.avaliadas || []);
      }, error => reject(error));
    });
  }

  public iniciar(demanda: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/iniciar', this.prepareToSave(demanda)).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public concluir(demanda: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/concluir', this.prepareToSave(demanda)).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public avaliar(avaliacao: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/avaliar', this.prepareToSave(avaliacao)).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public pausar(pausa: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/pausar', this.prepareToSave(pausa)).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public reiniciar(pausa: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/reiniciar', this.prepareToSave(pausa)).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public cancelarInicio(demanda_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-inicio', {id: demanda_id}).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public cancelarConclusao(demanda_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-conclusao', {id: demanda_id}).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public cancelarAvaliacao(demanda_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-avaliacao', {id: demanda_id}).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public prorrogar(prorrogar: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/prorrogar', this.prepareToSave(prorrogar)).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public arquivar(demanda_id: string, arquivar: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/arquivar', {id: demanda_id, arquivar: arquivar}).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

}

