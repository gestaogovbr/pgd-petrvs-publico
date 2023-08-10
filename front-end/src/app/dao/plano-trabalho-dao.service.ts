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
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "carga_horaria", label: "Carga horária diária" },
      { field: "tempo_total", label: "Tempo total do plano" },
      { field: "tempo_proporcional", label: "Tempo proporcional (descontando afastamentos)" },
      { field: "data_inicio_vigencia", label: "Data inicial do plano", type: "DATETIME" },
      { field: "data_fim_vigencia", label: "Data final do plano", type: "DATETIME" },
      { field: "tipo_modalidade", label: "tipo_modalidade", fields: this.tipoModalidadeDao.dataset(), type: "OBJECT" },
      { field: "unidade", label: "unidade", fields: this.unidadeDao.dataset(), type: "OBJECT" },
      { field: "usuario", label: "usuario", fields: this.usuarioDao.dataset(), type: "OBJECT" },
      { field: "programa", label: "programa", fields: this.programaDao.dataset(), type: "OBJECT" },
      { field: "entregas", label: "entregas", fields: this.planoTrabalhoEntregaDao.dataset(), type: "ARRAY" }
    ], deeps);
  }

  public metadadosPlano(plano_trabalho_id: string, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<MetadadosPlano> {
    return new Promise<MetadadosPlano>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadados-plano', {plano_trabalho_id, inicioPeriodo, fimPeriodo}).subscribe(response => {
        resolve(response?.metadadosPlano || []);
      }, error => reject(error));
    });
  }

}

