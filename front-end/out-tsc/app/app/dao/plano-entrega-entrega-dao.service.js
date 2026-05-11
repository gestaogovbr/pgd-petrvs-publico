import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanoEntregaEntregaDaoService = class PlanoEntregaEntregaDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoEntregaEntrega", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["descricao", "destinatario"];
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "descricao", label: "Descrição da entrega" },
            { field: "data_inicio", label: "Data início" },
            { field: "data_fim", label: "Data fim" },
            { field: "homologado", label: "Se a entrega já foi homologada" },
            { field: "progresso_esperado", label: "Percentual de progesso esperado da entrega" },
            { field: "progresso_realizado", label: "Percentual de progesso realizado da entrega" },
            { field: "destinatario", label: "Destinatário da entrega" }
        ], deeps);
    }
    hierarquia(PlanoEntregaEntregaId) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/hierarquia', {
                entrega_id: PlanoEntregaEntregaId
            }).subscribe(response => {
                resolve(this.loadHierarquiaDados(response.hierarquia, PlanoEntregaEntregaId));
            }, error => {
                console.log("Erro ao montar a hierarquia da entrega!", error);
                resolve([]);
            });
        });
    }
    loadHierarquiaDados(data, entrega_id) {
        const entregaAtual = this.mapHierarquia(data, entrega_id);
        const children = data.filhos ? data.filhos.flatMap((filho) => this.loadHierarquiaDados(filho, entrega_id)) : [];
        if (data.pai) {
            const pai = this.mapHierarquia(data.pai, entrega_id);
            return [{ ...pai, children: [{ ...entregaAtual, children }] }];
        }
        return [{ ...entregaAtual, children }];
    }
    mapHierarquia(data, entrega_id) {
        return {
            label: data.descricao,
            key: data.id,
            data: data,
            expanded: true,
            styleClass: entrega_id == data.id ? 'bg-primary text-white' : '',
            children: [],
        };
    }
    possuiVinculosExcluidos(entregaIds) {
        return new Promise((resolve) => {
            this.server.post('api/' + this.collection + '/possui-vinculos-excluidos', {
                entregaIds: entregaIds
            }).subscribe({
                next: (response) => {
                    resolve(response?.vinculos_excluidos || []);
                },
                error: (error) => {
                    console.error("Erro ao verificar vínculos excluídos da entrega:", error);
                    resolve([]);
                }
            });
        });
    }
    validateDestroy(entity) {
        return new Promise((resolve, reject) => {
            this.server
                .post(this.PREFIX_URL + '/' + this.collection + '/validate-destroy', {
                id: typeof entity == 'string' ? entity : entity.id,
            }).subscribe({
                next: (response) => {
                    if (response.error) {
                        reject(response.error);
                    }
                    else {
                        resolve();
                    }
                },
                error: (error) => reject(error)
            });
        });
    }
};
PlanoEntregaEntregaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaEntregaDaoService);
export { PlanoEntregaEntregaDaoService };
//# sourceMappingURL=plano-entrega-entrega-dao.service.js.map