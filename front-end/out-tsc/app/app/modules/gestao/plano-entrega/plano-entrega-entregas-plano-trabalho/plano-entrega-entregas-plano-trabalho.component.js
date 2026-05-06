import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoTrabalhoService } from '../../plano-trabalho/plano-trabalho.service';
let PlanoEntregaEntregasPlanoTrabalhoComponent = class PlanoEntregaEntregasPlanoTrabalhoComponent extends PageFrameBase {
    set entregaId(value) {
        if (this._entregaId != value) {
            this._entregaId = value;
        }
    }
    get entregaId() {
        return this._entregaId;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.loader = false;
        this.PlanoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.PlanoTrabalhoEntregaDao = injector.get(PlanoTrabalhoEntregaDaoService);
        this.planoTrabalhoService = injector.get(PlanoTrabalhoService);
        this.join = ["plano_trabalho.usuario", "plano_entrega_entrega.plano_entrega.unidade"];
        this.groupBy = [{ field: "plano_trabalho.usuario", label: "Usuário" }];
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadData();
    }
    loadData() {
        this.loader = true;
        this.cdRef.detectChanges();
        try {
            this.PlanoTrabalhoEntregaDao.query({ where: [["plano_entrega_entrega_id", "==", this._entregaId], ['planoTrabalho.status', 'in', ['ATIVO', 'CONCLUIDO', 'AVALIADO']]], join: this.join }).asPromise().then(response => {
                response.forEach((item) => {
                    const usuario = item.plano_trabalho.usuario;
                    if (usuario) {
                        const usuarioId = usuario.id;
                        let usuarioExistente = this.items.find((u) => u.id === usuarioId);
                        if (!usuarioExistente) {
                            usuarioExistente = {
                                ...usuario,
                                planos_trabalho: [],
                                initialization(data) {
                                },
                            };
                            this.items.push(usuarioExistente);
                        }
                        const planoTrabalhoId = item.plano_trabalho.id;
                        let planoTrabalho = usuarioExistente.planos_trabalho.find((pt) => pt.id === planoTrabalhoId);
                        if (!planoTrabalho) {
                            planoTrabalho = {
                                ...item.plano_trabalho,
                                entregas: [],
                                initialization(data) {
                                },
                            };
                            usuarioExistente.planos_trabalho.push(planoTrabalho);
                        }
                        const entrega = {
                            ...item,
                            initialization(data) {
                            },
                        };
                        planoTrabalho.entregas.push(entrega);
                    }
                });
            }).finally(() => {
                this.loader = false;
                this.cdRef.detectChanges();
            });
        }
        catch (e) {
            console.log("Erro");
        }
    }
    totalForcaTrabalho(entregas = []) {
        const forca = entregas.map(x => x.forca_trabalho * 1).reduce((a, b) => a + b, 0);
        return Math.round(forca * 100) / 100;
    }
    planoAtivo(planos) {
        const planoAtivo = planos.find((plano) => plano.status === "ATIVO");
        return planoAtivo || {};
    }
};
__decorate([
    ViewChild('accordionUser', { static: false })
], PlanoEntregaEntregasPlanoTrabalhoComponent.prototype, "accordionUser", void 0);
__decorate([
    Input()
], PlanoEntregaEntregasPlanoTrabalhoComponent.prototype, "entregaId", null);
PlanoEntregaEntregasPlanoTrabalhoComponent = __decorate([
    Component({
        selector: 'plano-entrega-entregas-plano-trabalho',
        templateUrl: './plano-entrega-entregas-plano-trabalho.component.html',
        styleUrls: ['./plano-entrega-entregas-plano-trabalho.component.scss'],
        standalone: false
    })
], PlanoEntregaEntregasPlanoTrabalhoComponent);
export { PlanoEntregaEntregasPlanoTrabalhoComponent };
//# sourceMappingURL=plano-entrega-entregas-plano-trabalho.component.js.map