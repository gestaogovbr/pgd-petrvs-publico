import { Injectable, Injector } from '@angular/core';
import { Unidade } from '../models/unidade.model';
import { AreaRelatorio } from '../modules/base/page-report-base';
import { CidadeDaoService } from './cidade-dao.service';
import { DaoBaseService } from './dao-base.service';
import { EntidadeDaoService } from './entidade-dao.service';
import { UsuarioDaoService } from './usuario-dao.service';
import { PlanoEntregaDaoService } from './plano-entrega-dao.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { Usuario } from '../models/usuario.model';
import { TreeNode } from 'primeng/api';
import { LookupItem } from '../services/lookup.service';
import { Planejamento } from '../models/planejamento.model';


export type UnidadeDashboard = {
  sigla: string,                                    // nome da Unidade
  qdePTAtivos: number,                              // quantidade de Planos de Trabalho ativos (vigentes)
  horasUteisTotaisPTAtivos: number,                 // total de horas úteis totais dos Planos de Trabalho ativos
  qdeServidores: number,                            // quantidade de servidores vinculados aos Planos de Trabalho da Unidade
  modalidadesPlanos: string[]
};

export type TodasUnidades = {
  unidades: LookupItem[];
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeDaoService extends DaoBaseService<Unidade> {
  public usuarioDao: UsuarioDaoService;
  public entidadeDao: EntidadeDaoService;
  public cidadeDao: CidadeDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;

  constructor(protected injector: Injector) {
    super("Unidade", injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.inputSearchConfig.searchFields = ["codigo", "sigla", "nome"];
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "codigo", label: "Código" },
      { field: "sigla", label: "Sigla" },
      { field: "nome", label: "Nome" },
      { field: "gestor", label: "Gestor", fields: this.usuarioDao.dataset([]), type: "OBJECT" },
      { field: "gestores_substitutos", label: "Gestor substituto", fields: this.usuarioDao.dataset([]), type: "ARRAY" },
      { field: "entidade", label: "Entidade", dao: this.entidadeDao },
      { field: "cidade", label: "Cidade", dao: this.cidadeDao },
      { field: "texto_complementar_plano", label: "Mensagem do Plano de trabalho", type: "TEMPLATE" }
    ], deeps);
  }

  public metadadosArea(unidade_id: String, programa_id: String): Promise<AreaRelatorio> {
    return new Promise<AreaRelatorio>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadados-area', { unidade_id, programa_id }).subscribe(response => {
        resolve(response?.metadadosArea || []);
      }, error => reject(error));
    });
  }

  public dashboards(idsUnidades: string[], programa_id: String, unidadesSubordinadas: boolean): Promise<UnidadeDashboard[] | null> {
    return new Promise<UnidadeDashboard[] | null>((resolve, reject) => {
      if (idsUnidades?.length && programa_id.length) {
        this.server.post('api/' + this.collection + '/dashboards', { idsUnidades, programa_id, unidadesSubordinadas }).subscribe(response => {
          resolve(response?.dashboards as UnidadeDashboard[]);
        }, error => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /* Retorna todas as unidades que têm a mesma sigla da entidade atual */
  public mesmaSigla() {
    return new Promise<Unidade[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/mesma-sigla', {}).subscribe(response => {
        resolve(response?.rows || []);
      }, error => reject(error));
    });
  }

  public unificar(correspondencias: { unidade_origem_id: string, unidade_destino_id: string }[], exclui: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/unificar', { correspondencias, exclui }).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public inativar(id: string, inativo: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/inativar', { id, inativo }).subscribe(response => {
        resolve(!!response?.success);
      }, error => reject(error));
    });
  }

  public subordinadas(unidade_id: string): Promise<Unidade[]> {
    return new Promise<Unidade[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/subordinadas', { unidade_id }).subscribe(response => {
        resolve(response?.subordinadas || []);
      }, error => reject(error));
    });
  }

  public hierarquiaUnidades(unidade_id: string | null | undefined): Promise<Unidade[]> {
    return new Promise<Unidade[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/hierarquia', { unidade_id }).subscribe(response => {
        resolve(response?.unidades || []);
      }, error => reject(error));
    });
  }

  public unidadesFilhas(unidade_id: string): Promise<Unidade[]> {
    return new Promise<Unidade[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/filhas', { unidade_id }).subscribe(response => {
        resolve(response?.unidades || []);
      }, error => reject(error));
    });
  }

  public unidadesSuperiores(unidade_id: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/linhaAscendente', { unidade_id }).subscribe(response => {
        resolve(response?.linhaAscendente || []);
      }, error => reject(error));
    });
  }

  public lotados(unidade_id: string): Promise<Usuario[]> {
    return new Promise<Usuario[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/lotados', { unidade_id }).subscribe(response => {
        resolve(response?.usuarios || []);
      }, error => reject(error));
    });
  }

  public lookupTodasUnidades(): Promise<LookupItem[]> {
    return new Promise<LookupItem[]>((resolve, reject) => {
      this.server.post('api/Unidade/lookup-todas-unidades', {}).subscribe(response => {
        resolve(response?.unidades || []);
      }, error => reject(error));
    });
  }

  /*   public planejamentosSuperiores(unidade_id: string): Promise<Planejamento[]>{
      return new Promise<Planejamento[]>((resolve, reject) => {
        this.server.post('api/Unidade/planejamentos-superiores',{ unidade_id }).subscribe(response => {
          resolve(response?.planejamentos || []);
        }, error => reject(error));
      });
    }
  
    public query(options: QueryOptions = {}, events: queryEvents = {}): QueryContext<T> {
      return this.contextQuery(new QueryContext<T>(this, this.collection, new Subject<T[]>(), options, events));
    } */

  public consultaUnidadeSIAPE(unidade: string) {
    return this.server.post('api/unidade/consultar-unidade-siape', { unidade });
  }
  public exportarUnidadeSIAPE(unidade: string) {
    return this.server.postDownload('api/unidade/exportar-unidade-siape', { unidade });
  }

  public sincronizarSIAPE(unidade: string) {
    return this.server.post('api/unidade/processar-siape', { unidade });
  }

  public baixaLogSiape(unidade: string) {
    return this.server.postDownload('api/unidade/download-unidade-siape', { unidade });
  }

  public obterInstituidora(unidade_id: string): Promise<Unidade> {
    return new Promise<Unidade>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/obter-instituidora', { unidade_id }).subscribe(response => {
        resolve(response?.unidade);
      }, error => reject(error));
    });
  }
      
}
