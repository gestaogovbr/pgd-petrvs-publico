import { Injectable, Injector } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { Plano } from '../models/plano.model';
import { Metadado } from 'src/app/modules/base/page-report-base';
import { DaoBaseService } from './dao-base.service';
import {Adesao} from "../models/adesao.model";
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { TipoModalidadeDaoService } from './tipo-modalidade-dao.service';
import { ProgramaDaoService } from './programa-dao.service';
import { EntidadeDaoService } from './entidade-dao.service';
import { UsuarioDaoService } from './usuario-dao.service';
import { UnidadeDaoService } from './unidade-dao.service';

@Injectable({
  providedIn: 'root'
})
export class AdesaoDaoService extends DaoBaseService<Adesao> {

  public tipoModalidadeDao: TipoModalidadeDaoService;
  public programaDao: ProgramaDaoService;
  public entidadeDao: EntidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;

  constructor(protected injector: Injector) {
    super("Adesao", injector);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "tipo_modalidade", label: "Tipo de modalidade", type: 'OBJECT', dao: this.tipoModalidadeDao },
      { field: "data_inicio_vigencia", label: "Data início" },
      { field: "data_fim_vigencia", label: "Data termino" },
      { field: "status", label: "Status" },
      { field: "programa", label: "Programa", type: 'OBJECT', dao: this.programaDao },
      { field: "usuarios", label: "Servidores", type: 'ARRAY', dao: this.usuarioDao },
      { field: "unidades", label: "Unidades", type: 'ARRAY', dao: this.unidadeDao }
    ]);
  }

  public metadados(plano: Plano, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<Metadado> {
    return new Promise<Metadado>((resolve, reject) => {
      this.server.post('api/Relatorio/metadados', {
        plano: plano, inicioPeriodo: inicioPeriodo, fimPeriodo: fimPeriodo
      }).subscribe(response => {
        resolve(response?.metadados || []);
      }, error => reject(error));
    });
  }

  public metadadosPlano(plano_id: string): Promise<Metadado> {
    return new Promise<Metadado>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadadosPlano', {plano_id}).subscribe(response => {
        resolve(response?.metadadosPlano || []);
      }, error => reject(error));
    });
  }

}

