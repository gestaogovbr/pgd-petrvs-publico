import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { ProgramaParticipante } from '../models/programa-participante.model';
import { UsuarioDaoService } from './usuario-dao.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaParticipanteDaoService extends DaoBaseService<ProgramaParticipante> {

  public usuarioDao: UsuarioDaoService;

  constructor(protected injector: Injector) { 
    super("ProgramaParticipante", injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
  }  

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "habilitado", label: "Habilitado" },
      { field: "usuario", label: "Usuário", fields: this.usuarioDao.dataset(), type: "OBJECT" }
    ], deeps);
  }

  public quantidadePlanosTrabalhoAtivos(ids: string[]) {
    return new Promise<number>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/quantidade-planos-trabalho-ativos', { ids: ids }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.count);
        }
      }, error => reject(error));
    });
  }

  public habilitar(participantesIds: string[], programaId: string, habilitar: number, suspenderPlanoTrabalho: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/habilitar', { 
        participantes_ids: participantesIds,
        programa_id: programaId,
        habilitar: habilitar,
        suspender_plano_trabalho: suspenderPlanoTrabalho
      }).subscribe({
        next: response => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(!!response?.success);
          }
        },
        error: error => reject(error)
      });
    });
  }

  public notificar(item: ProgramaParticipante) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/notificar', { 
        participantes_ids: item.id,
        programa_id: item.programa_id,
        habilitado: item.habilitado 
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

}

