import { Injectable, Injector } from '@angular/core';
import { PlanoTrabalho } from '../models/plano-trabalho.model';
import { MetadadosPlano } from 'src/app/modules/base/page-report-base';
import { DaoBaseService } from './dao-base.service';
import { TipoModalidadeDaoService } from './tipo-modalidade-dao.service';
import { UnidadeDaoService } from './unidade-dao.service';
import { UsuarioDaoService } from './usuario-dao.service';
import { ProgramaDaoService } from './programa-dao.service';
import { LookupService } from '../services/lookup.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoTrabalhoEntregaDaoService } from './plano-trabalho-entrega-dao.service';
import { Programa } from '../models/programa.model';

export type PlanoTrabalhoByUsuario = {
  planos: PlanoTrabalho[],
  programas: Programa[]
}

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoDaoService extends DaoBaseService<PlanoTrabalho> {

  public tipoModalidadeDao: TipoModalidadeDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public programaDao: ProgramaDaoService;
  public planoTrabalhoEntregaDao: PlanoTrabalhoEntregaDaoService;
  public lookup: LookupService;

  constructor(protected injector: Injector) {
    super("PlanoTrabalho", injector);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.planoTrabalhoEntregaDao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.inputSearchConfig.searchFields = ["numero", "data_inicio", "data_fim"];
    this.inputSearchConfig.display = (data: any[]) => "#" + data[0] + ": " + this.util.getDateFormatted(data[1]) + " a " + this.util.getDateFormatted(data[2]) + " - " + data[3];
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "carga_horaria", label: "Carga horária diária" },
      { field: "tempo_total", label: "Tempo total do plano" },
      { field: "tempo_proporcional", label: "Tempo proporcional (descontando afastamentos)" },
      { field: "data_inicio", label: "Data inicial do plano", type: "DATETIME" },
      { field: "data_fim", label: "Data final do plano", type: "DATETIME" },
      { field: "tipo_modalidade", label: "Tipo de modalidade", fields: this.tipoModalidadeDao.dataset(), type: "OBJECT" },
      { field: "unidade", label: "Unidade", fields: this.unidadeDao.dataset(), type: "OBJECT" },
      { field: "usuario", label: "Usuário", fields: this.usuarioDao.dataset(), type: "OBJECT" },
      { field: "programa", label: "Programa", fields: this.programaDao.dataset(), type: "OBJECT" },
      { field: "entregas", label: "Entregas", fields: this.planoTrabalhoEntregaDao.dataset(), type: "ARRAY" },
      { field: "criterios_avaliacao", label: "Critérios de avaliação", fields: [{ field: "value", label: "Critério" }], type: "ARRAY" }
    ], deeps);
  }

  public metadadosPlano(planoTrabalhoId: string, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<MetadadosPlano> {
    return new Promise<MetadadosPlano>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadados-plano', {plano_trabalho_id: planoTrabalhoId, inicioPeriodo, fimPeriodo}).subscribe(response => {
        resolve(response?.metadadosPlano || []);
      }, error => reject(error));
    });
  }

  public getByUsuario(usuarioId: string, arquivados: boolean, planoTrabalhoId: string | null = null) {
    return new Promise<PlanoTrabalhoByUsuario>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/get-by-usuario', {usuario_id: usuarioId, arquivados, plano_trabalho_id: planoTrabalhoId}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          let dados = response?.dados as PlanoTrabalhoByUsuario;
          dados.planos = dados.planos.map(x => new PlanoTrabalho(this.getRow(x)));
          dados.programas = dados.programas.map(x => new Programa(this.getRow(x)));
          dados.planos.forEach(x => x.programa = dados.programas.find(y => y.id == x.programa_id));
          resolve(dados);
        }
      }, error => reject(error));
    });
  }

  public arquivar(planoTrabalho: PlanoTrabalho): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/arquivar', { id: planoTrabalho.id, arquivar: planoTrabalho.arquivar }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public ativar(planoTrabalho: PlanoTrabalho, justificativa: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/ativar', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public cancelarAssinatura(planoTrabalho: PlanoTrabalho, justificativa: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-assinatura', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public cancelarPlano(planoTrabalho: PlanoTrabalho, justificativa: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-plano', { id: planoTrabalho.id, justificativa: justificativa, arquivar: planoTrabalho.arquivar }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public enviarParaAssinatura(planoTrabalho: PlanoTrabalho, justificativa: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/enviar-para-assinatura', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public reativar(planoTrabalho: PlanoTrabalho, justificativa: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/reativar', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public suspender(planoTrabalho: PlanoTrabalho, justificativa: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/suspender', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public planosUsuarioComPendencias(usuarioId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/planos-usuario-com-pendencias', { usuario_id: usuarioId }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response?.dados || false);
        }
      }, error => reject(error));
    });
  }

}

