import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { CidadeDaoService } from './cidade-dao.service';
import { DaoBaseService } from './dao-base.service';
import { EntidadeDaoService } from './entidade-dao.service';
import { UsuarioDaoService } from './usuario-dao.service';
import { PlanoEntregaDaoService } from './plano-entrega-dao.service';
import { firstValueFrom } from 'rxjs';
let UnidadeDaoService = class UnidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("Unidade", injector);
        this.injector = injector;
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.entidadeDao = injector.get(EntidadeDaoService);
        this.cidadeDao = injector.get(CidadeDaoService);
        this.planoEntregaDao = injector.get(PlanoEntregaDaoService);
        this.inputSearchConfig.searchFields = ["codigo", "sigla", "nome"];
    }
    dataset(deeps) {
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
    metadadosArea(unidade_id, programa_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/metadados-area', { unidade_id, programa_id }).subscribe(response => {
                resolve(response?.metadadosArea || []);
            }, error => reject(error));
        });
    }
    dashboards(idsUnidades, programa_id, unidadesSubordinadas) {
        return new Promise((resolve, reject) => {
            if (idsUnidades?.length && programa_id.length) {
                this.server.post('api/' + this.collection + '/dashboards', { idsUnidades, programa_id, unidadesSubordinadas }).subscribe(response => {
                    resolve(response?.dashboards);
                }, error => reject(error));
            }
            else {
                resolve(null);
            }
        });
    }
    /* Retorna todas as unidades que têm a mesma sigla da entidade atual */
    mesmaSigla() {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/mesma-sigla', {}).subscribe(response => {
                resolve(response?.rows || []);
            }, error => reject(error));
        });
    }
    unificar(correspondencias, exclui) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/unificar', { correspondencias, exclui }).subscribe(response => {
                resolve(!!response?.success);
            }, error => reject(error));
        });
    }
    inativar(id, inativo) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/inativar', { id, inativo }).subscribe(response => {
                resolve(!!response?.success);
            }, error => reject(error));
        });
    }
    subordinadas(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/subordinadas', { unidade_id }).subscribe(response => {
                resolve(response?.subordinadas || []);
            }, error => reject(error));
        });
    }
    hierarquiaUnidades(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/hierarquia', { unidade_id }).subscribe(response => {
                resolve(response?.unidades || []);
            }, error => reject(error));
        });
    }
    unidadesFilhas(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/filhas', { unidade_id }).subscribe(response => {
                resolve(response?.unidades || []);
            }, error => reject(error));
        });
    }
    unidadesSuperiores(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/linhaAscendente', { unidade_id }).subscribe(response => {
                resolve(response?.linhaAscendente || []);
            }, error => reject(error));
        });
    }
    lotados(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/lotados', { unidade_id }).subscribe(response => {
                resolve(response?.usuarios || []);
            }, error => reject(error));
        });
    }
    lookupTodasUnidades() {
        return new Promise((resolve, reject) => {
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
    consultaUnidadeSIAPE(unidade) {
        return this.server.post('api/unidade/consultar-unidade-siape', { unidade });
    }
    exportarUnidadeSIAPE(unidade) {
        return this.server.postDownload('api/unidade/exportar-unidade-siape', { unidade });
    }
    sincronizarSIAPE(unidade) {
        return this.server.post('api/unidade/processar-siape', { unidade });
    }
    baixaLogSiape(unidade) {
        return this.server.postDownload('api/unidade/download-unidade-siape', { unidade });
    }
    relatorioProcessamentoSIAPE(unidade) {
        return this.server.post('api/unidade/relatorio-processamento-siape', { unidade });
    }
    obterInstituidora(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/obter-instituidora', { unidade_id }).subscribe(response => {
                resolve(response?.unidade);
            }, error => reject(error));
        });
    }
    ativarTemporariamente(unidade_id, justificativa) {
        return firstValueFrom(this.server.post('api/Unidade/ativar-temporariamente', {
            data: { unidade_id: unidade_id, justificativa: justificativa }
        }));
    }
};
UnidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UnidadeDaoService);
export { UnidadeDaoService };
//# sourceMappingURL=unidade-dao.service.js.map